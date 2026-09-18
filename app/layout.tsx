import './globals.css'

export const metadata = {
  title: 'ShopFixture Test Pages',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
