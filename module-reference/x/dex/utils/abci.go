package utils

import (
	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func GetBlockGasUsed(ctx sdk.Context) (gasUsed uint64, err error) {
	switch {
	case ctx.BlockGasMeter() != nil:
		return ctx.BlockGasMeter().GasConsumed(), nil
	case ctx.IsCheckTx():
		// If we are checking a TX or this is a simulation we can return whatever
		return 0, nil
	default:
		// Otherwise, BlockGasMeter should probably be initialized
		return 0, errors.New("block Gas Meter is not initialized")
	}
}

func MustGetBlockGasUsed(ctx sdk.Context) uint64 {
	gasUsed, err := GetBlockGasUsed(ctx)
	if err != nil {
		panic(err)
	}

	return gasUsed
}
