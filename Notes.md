react hook form ->allows to manage the multiple fields in a form in a single obj instead of multiple state variables
useHooks-ts is the ready made hooks library
toast is brought from the sonner of shadcn ui
shadcn forms work on the different base libs like react-hook-form, etc and also use zod or any other validator(is only schema validator allowed?)

| Feature                       | `next/navigation` → **App Router** | `next/router` → **Pages Router**     |
| ----------------------------- | ---------------------------------- | ------------------------------------ |
| Works in                      | `/app` directory                   | `/pages` directory                   |
| useRouter() returns           | **New Router** (client hooks)      | **Old Router** (Next.js 12/13 pages) |
| Best for                      | Next.js 13+ modern apps            | Legacy projects                      |
| Status                        | **Recommended**                    | Deprecated (soon removed)            |
| Supports Server Components    | ✔ Yes                              | ❌ No                                 |
| redirect(), useSearchParams() | ✔ Available                        | ❌ Not available                      |

| Term               | Meaning                                      |
| ------------------ | -------------------------------------------- |
| `SubmitHandler<T>` | A TypeScript type for your onSubmit function |
| What it does       | Ensures `data` matches your form type        |
| Why useful         | Autocomplete + type safety                   |
| Works with         | RHF, Zod, TypeScript                         |


| Feature | `$pull` (in `updateOne`) | Manual `find()`, modify, `save()` |
| :--- | :--- | :--- |
| **Atomicity** | **Atomic** | **Not Atomic** |
| **Concurrency** | **Safe** (Prevents race conditions) | **Unsafe** (Prone to race conditions) |
| **Performance** | **High** (1 DB round-trip) | **Lower** (2+ DB round-trips) |
| **Network Traffic**| **Minimal** (Sends a small command) | **High** (Transfers the full document twice) |
| **Code Complexity**| **Low** (Declarative, one-liner) | **Higher** (Imperative, more boilerplate) |

