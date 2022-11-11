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
                                'neutron/feerefunder/state'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Governance',
                            items: [
                                'neutron/gov/overview',
                                'neutron/gov/messages',
                                'neutron/gov/client',
                                'neutron/gov/state',
                                'neutron/gov/events'
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
                'tutorials/cosmwasm_transfer',
                'tutorials/cosmwasm_icq',
                'tutorials/integration_tests'
            ],
        },
    ]
};

module.exports = sidebars;
