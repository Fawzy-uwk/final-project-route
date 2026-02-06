"use client"
import { Spinner } from '@heroui/react'
import React from 'react'

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
            <div className="flex items-center gap-2">
                <div className="text-white bg-black w-7 h-7 flex items-center justify-center rounded font-bold">S</div>
                <p className="font-bold text-black text-2xl tracking-tighter">ShopMart</p>
            </div>


            <Spinner
                color="default"
                labelColor="foreground"

                size="lg"
            />
        </div>
    )
}