/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docs: [
        {
            type: 'category',
            label: 'Neutron',
            items: [
                'neutron/overview',
                {
                    type: 'category',
                    label: 'Modules',
                    items: [
                        {
                            type: 'category',
                            label: 'Interchain Transactions',
                            items: [
                                'neutron/interchain-txs/overview',
                                'neutron/interchain-txs/messages',
                                'neutron/interchain-txs/client',
                                'neutron/interchain-txs/state',
                                'neutron/interchain-txs/events'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Interchain Queries',
                            items: [
                                'neutron/interchain-queries/overview',
                                'neutron/interchain-queries/messages',
                                'neutron/interchain-queries/client',
                                'neutron/interchain-queries/state',
                                'neutron/interchain-queries/events'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Transfer',
                            items: [
                                'neutron/transfer/overview',
                                'neutron/transfer/state',
                                'neutron/transfer/messages'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Contract Manager',
                            items: [
                                'neutron/contract-manager/overview',
                                'neutron/contract-manager/client',
                                'neutron/contract-manager/state'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Fee Refunder',
                            items: [
                                'neutron/feerefunder/overview',
                                'neutron/feerefunder/client',
                                'neutron/feerefunder/state',
                                'neutron/feerefunder/events'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Fee Burner',
                            items: [
                                'neutron/feeburner/overview',
                                'neutron/feeburner/client',
                                'neutron/feeburner/state'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Cron',
                            items: [
                                'neutron/cron/overview',
                                'neutron/cron/client',
                                'neutron/cron/state',
                                'neutron/cron/metrics'
                            ]
                        }
                    ],
                },
                {
                    type: 'category',
                    label: 'Tokenomics',
                    items: [
                        'neutron/tokenomics/overview',
                        {
                            type: 'category',
                            label: 'Reserve',
                            items: [
                                'neutron/tokenomics/reserve/overview',
                                'neutron/tokenomics/reserve/messages',
                                'neutron/tokenomics/reserve/queries'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Treasury',
                            items: [
                                'neutron/tokenomics/treasury/overview',
                                'neutron/tokenomics/treasury/messages',
                                'neutron/tokenomics/treasury/queries'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Distribution',
                            items: [
                                'neutron/tokenomics/distribution/overview',
                                'neutron/tokenomics/distribution/messages',
                                'neutron/tokenomics/distribution/queries'
                            ]
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Neutron DAO',
                    items: [
                        'neutron/dao/overview',
                        'neutron/dao/dao-dao-diff',
                    ],
                },
                {
                    type: 'category',
                    label: 'Token Generation Event',
                    items: [
                        {
                            type: 'category',
                            label: 'Airdrop',
                            items: [
                                'neutron/token-generation-event/airdrop/overview',
                                'neutron/token-generation-event/airdrop/messages',
                                'neutron/token-generation-event/airdrop/queries',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Auction',
                            items: [
                                'neutron/token-generation-event/auction/overview',
                                'neutron/token-generation-event/auction/messages',
                                'neutron/token-generation-event/auction/queries',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Credits',
                            items: [
                                'neutron/token-generation-event/credits/overview',
                                'neutron/token-generation-event/credits/messages',
                                'neutron/token-generation-event/credits/queries',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Lockdrop',
                            items: [
                                'neutron/token-generation-event/lockdrop/overview',
                                'neutron/token-generation-event/lockdrop/messages',
                                'neutron/token-generation-event/lockdrop/queries',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'LP Vesting',
                            items: [
                                'neutron/token-generation-event/vesting-lp/overview',
                                'neutron/token-generation-event/vesting-lp/messages',
                                'neutron/token-generation-event/vesting-lp/queries',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Investors Vesting',
                            items: [
                                'neutron/token-generation-event/investors-vesting/overview',
                                'neutron/token-generation-event/investors-vesting/messages',
                                'neutron/token-generation-event/investors-vesting/queries',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Oracle',
                            items: [
                                'neutron/token-generation-event/oracle/overview',
                                'neutron/token-generation-event/oracle/messages',
                                'neutron/token-generation-event/oracle/queries',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Band Price Feed',
                            items: [
                                'neutron/token-generation-event/price-feed/overview',
                                'neutron/token-generation-event/price-feed/messages',
                                'neutron/token-generation-event/price-feed/queries',
                            ]
                        },
                    ],
                },
                'neutron/build',
                'neutron/contribute',
            ],
        },
        {
            type: 'category',
            label: '3rd Party Modules',
            items: [
                '3rdparty/overview',
                {
                    type: 'category',
                    label: 'Osmosis',
                    items: [
                        {
                            type: 'category',
                            label: 'Token Factory',
                            items: [
                                '3rdparty/osmosis/tokenfactory/overview',
                                '3rdparty/osmosis/tokenfactory/messages'
                            ]
                        }
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'Relaying',
            items: [
                'relaying/ibc-relayer',
                'relaying/icq-relayer',
                'relaying/target-chain',
            ],
        },
        {
            type: 'category',
            label: 'Tutorials',
            items: [
                'tutorials/cosmwasm_ica',
                'tutorials/cosmwasm_icq',
                'tutorials/integration_tests'
            ],
        },
    ]
};

module.exports = sidebars;
