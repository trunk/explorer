export enum ClusterStatus {
    Connected,
    Connecting,
    Failure,
}

export enum Cluster {
    Testnet,
    MainnetBeta,
    Devnet,
    Custom,
}

export const CLUSTERS = [Cluster.Testnet];

export function clusterSlug(cluster: Cluster): string {
    switch (cluster) {
        case Cluster.Testnet:
            return 'testnet';
        case Cluster.MainnetBeta:
            return 'mainnet-beta';
        case Cluster.Devnet:
            return 'devnet';
        case Cluster.Custom:
            return 'custom';
    }
}

export function clusterName(cluster: Cluster): string {
    switch (cluster) {
        case Cluster.Testnet:
            return 'Testnet';
        case Cluster.MainnetBeta:
            return 'Mainnet Beta';
        case Cluster.Devnet:
            return 'Devnet';
        case Cluster.Custom:
            return 'Custom';
    }
}

export const TESTNET_URL = 'https://api.testnet.solana.com';

export function clusterUrl(cluster: Cluster): string {
    const modifyUrl = (url: string): string => {
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
            return url;
        } else {
            console.log(cluster);
            return url.replace('api', 'explorer-api');
        }
    };

    return process.env.NEXT_PUBLIC_TESTNET_RPC_URL ?? modifyUrl(TESTNET_URL);
}

export const DEFAULT_CLUSTER = Cluster.Testnet;
