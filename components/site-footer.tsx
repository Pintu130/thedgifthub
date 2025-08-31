export function SiteFooter() {
  return (
    <footer className="border-t mt-12">
      <div className="px-4 md:px-8 py-8 text-sm text-muted-foreground flex items-center justify-between">
        <p>&copy; {new Date().getFullYear()} The D Gift Hub</p>
        <p>Stripe-only payments. No COD.</p>
      </div>
    </footer>
  )
}
