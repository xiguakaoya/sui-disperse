"use client";


import {WalletProvider} from '@suiet/wallet-kit';




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WalletProvider>
    <html lang="en">
      <body>{children}</body>
    </html>
    </WalletProvider>
  )
}
