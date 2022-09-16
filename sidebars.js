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
                'intro'
            ],
        },
        {
            type: 'category',
            label: 'Neutron Core',
            items: [
                'neutron-core/build',
                'neutron-core/sdk',
                {
                    type: 'category',
                    label: 'Modules',
                    items: [
                        {
                            type: 'category',
                            label: 'Interchain Transactions',
                            items: [
                                'neutron-core/interchain-txs/overview',
                                'neutron-core/interchain-txs/messages',
                                'neutron-core/interchain-txs/client',
                                'neutron-core/interchain-txs/state',
                                'neutron-core/interchain-txs/events'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Interchain Queries',
                            items: [
                                'neutron-core/interchain-queries/overview',
                                'neutron-core/interchain-queries/messages',
                                'neutron-core/interchain-queries/client',
                                'neutron-core/interchain-queries/state',
                                'neutron-core/interchain-queries/events'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Transfer',
                            items: [
                                'neutron-core/transfer/overview',
                                'neutron-core/transfer/state',
                                'neutron-core/transfer/messages'
                            ]
                        },
                    ],
                },
                'neutron-core/contribute',
            ],
        },
        {
            type: 'category',
            label: 'Relaying',
            items: [
                'relaying/ibc-relayer-guide',
                'relaying/icq-relayer-guide',
            ],
        },
        {
            type: 'category',
            label: 'Tutorials',
            items: [
                'tutorials/overview',
                'tutorials/cosmwasm_ica',
                'tutorials/cosmwasm_icq',
                'tutorials/integration_tests'
            ],
        },
    ]
};

module.exports = sidebars;
