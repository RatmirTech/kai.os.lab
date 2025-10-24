#!/bin/ksh

function fact
{
    integer x
    if (( $1 <= 1 ))
    then
        echo 1
    else
        (( x = $1 - 1 ))
        x=$(fact $x)
        (( x = x * $1 ))
        echo $x
    fi
}

fact $1
