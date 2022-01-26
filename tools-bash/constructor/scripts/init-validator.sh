#!/bin/bash -i

KEYPASSWD="123123123"
MNEMONIC="attack famous intact dune rebel final cage benefit stereo special rough decide scissors entry illegal tired orchard stay abstract exit fortune catalog attitude rug"
(echo $KEYPASSWD; echo $KEYPASSWD; echo $MNEMONIC) | cudos-noded keys add validator --recover --keyring-backend os