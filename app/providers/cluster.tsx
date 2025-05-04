'use client';

import { Cluster, clusterName, ClusterStatus, clusterUrl, DEFAULT_CLUSTER } from '@utils/cluster';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { createSolanaRpc } from 'web3js-experimental';

import { EpochSchedule } from '../utils/epoch-schedule';

type Action = State;

interface EpochInfo {
    absoluteSlot: bigint;
    blockHeight: bigint;
    epoch: bigint;
    slotIndex: bigint;
    slotsInEpoch: bigint;
}

interface ClusterInfo {
    firstAvailableBlock: bigint;
    epochSchedule: EpochSchedule;
    epochInfo: EpochInfo;
}

type Dispatch = (action: Action) => void;

type SetShowModal = React.Dispatch<React.SetStateAction<boolean>>;

interface State {
    cluster: Cluster;
    customUrl: string;
    clusterInfo?: ClusterInfo;
    status: ClusterStatus;
}

const DEFAULT_CUSTOM_URL = 'http://localhost:8899';

function clusterReducer(state: State, action: Action): State {
    switch (action.status) {
        case ClusterStatus.Connected:
        case ClusterStatus.Failure: {
            if (state.cluster !== action.cluster || state.customUrl !== action.customUrl) return state;
            return action;
        }
        case ClusterStatus.Connecting: {
            return action;
        }
    }
}

function parseQuery(): Cluster {
    return Cluster.Testnet; 
}

const ModalContext = createContext<[boolean, SetShowModal] | undefined>(undefined);
const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);

type ClusterProviderProps = { children: React.ReactNode };
export function ClusterProvider({ children }: ClusterProviderProps) {
    const [state, dispatch] = useReducer(clusterReducer, {
        cluster: DEFAULT_CLUSTER,
        customUrl: DEFAULT_CUSTOM_URL,
        status: ClusterStatus.Connecting,
    });
    const modalState = useState(false);
    const cluster = parseQuery();
    const customUrl = state.customUrl;

    // Reconnect to cluster when params change
    useEffect(() => {
        updateCluster(dispatch, cluster, customUrl);
    }, [cluster, customUrl]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

async function updateCluster(dispatch: Dispatch, cluster: Cluster, customUrl: string) {
    dispatch({
        cluster,
        customUrl,
        status: ClusterStatus.Connecting,
    });

    try {
        // validate url
        new URL(customUrl);

        const transportUrl = clusterUrl(cluster);
        const rpc = createSolanaRpc(transportUrl);

        const [firstAvailableBlock, epochSchedule, epochInfo] = await Promise.all([
            rpc.getFirstAvailableBlock().send(),
            rpc.getEpochSchedule().send(),
            rpc.getEpochInfo().send(),
        ]);

        dispatch({
            cluster,
            clusterInfo: {
                epochInfo,
                // These are incorrectly typed as unknown
                // See https://github.com/solana-labs/solana-web3.js/issues/1389
                epochSchedule: epochSchedule as EpochSchedule,
                firstAvailableBlock: firstAvailableBlock as bigint,
            },
            customUrl,
            status: ClusterStatus.Connected,
        });
    } catch (error) {
        if (cluster !== Cluster.Testnet) {
            console.error(error, { clusterUrl: clusterUrl(cluster) });
        }
        dispatch({
            cluster,
            customUrl,
            status: ClusterStatus.Failure,
        });
    }
}

export function useUpdateCustomUrl() {
    const dispatch = useContext(DispatchContext);
    if (!dispatch) {
        throw new Error(`useUpdateCustomUrl must be used within a ClusterProvider`);
    }

    return (customUrl: string) => {
        updateCluster(dispatch, Cluster.Testnet, customUrl);
    };
}

export function useCluster() {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error(`useCluster must be used within a ClusterProvider`);
    }
    return {
        ...context,
        name: clusterName(context.cluster),
        url: clusterUrl(context.cluster),
    };
}

export function useClusterModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error(`useClusterModal must be used within a ClusterProvider`);
    }
    return context;
}
