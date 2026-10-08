<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- The landing page is a single React route (`src/routes/index.tsx`) with all content in typed arrays at the top of the file; the original static site stays under `public/site/` and is linked, not embedded — keeps content edits in one place while preserving the legacy WiFi/notice pages.
- Embed YouTube through the `VideoEmbed` click-to-play facade (poster image + play button, iframe only after click), never a raw autoloading iframe — avoids heavy third-party scripts on first paint and keeps the brand frame around videos.
- Google Maps is embedded with the key-less `maps?q=<place>&output=embed` URL pointing at the same place the short link resolves to — no API key to manage, and the pin matches the official link.
- All marketing copy must be traceable to the library's own materials (original site HTML or the poster images); do not invent offers, facilities or guarantees.
- Design tokens live in `src/styles.css` (`@theme` + `@utility`); use the semantic utilities (`bg-hero`, `bg-gold-gradient`, `text-gold-gradient`, `shadow-gold`, `bg-gold-line`, `bg-dots`) instead of hard-coded colors.
