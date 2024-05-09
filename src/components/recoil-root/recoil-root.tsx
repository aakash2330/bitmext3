
"use client"

import * as React from "react"
import { RecoilRoot, RecoilRootProps } from "recoil"


export function RecoilRootProvider({ children, ...props }: RecoilRootProps) {
  return <RecoilRoot {...props}>{children}</RecoilRoot>
}
