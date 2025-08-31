import Link from "next/link"

// Attempt to import your categories helper if it exists
// If it doesn't, page will still render with fallback list.
let getCategories: undefined | (() => Promise<{ slug: string; name: string; count?: number }[]>)
try {
  // @ts-expect-error - optional import depending on your data module
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  getCategories = (await import("@/lib/data")).getCategories
} catch {}

export default async function CategoriesPage() {
  let categories: { slug: string; name: string; count?: number }[] = []
  try {
    categories = getCategories ? await getCategories() : []
  } catch {
    categories = []
  }
  if (categories.length === 0) {
    categories = [
      { slug: "corporate-gifts", name: "Corporate" },
      { slug: "phone-stand", name: "Phone Stand" },
      { slug: "diary", name: "Diary" },
      { slug: "books", name: "Books" },
      { slug: "key-stand", name: "Key Stand" },
    ]
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold">Categories</h1>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/category/${c.slug}`} className="block rounded-md border p-4 hover:border-primary">
              <div className="text-sm font-medium">{c.name}</div>
              {typeof c.count === "number" ? (
                <div className="text-xs text-muted-foreground">{c.count} items</div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
