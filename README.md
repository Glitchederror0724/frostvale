# FrostVale Website

A static GitHub Pages website for FrostVale SMP.

## Upload to GitHub

1. Create a new GitHub repository, for example `FrostVale`.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then save.
6. GitHub will provide your public website URL.

## Easy edits

- Server address and status address: edit `script.js`.
- Discord invite: edit `index.html` (and optionally `script.js`).
- Rules, ranks, commands, and text: edit `index.html`.
- Colors/design: edit the variables at the top of `style.css`.

## Server status

The page currently queries `api.mcsrvstat.us` from the visitor's browser. If the server is sleeping, the page may display it as offline until FrostVale starts.

## Notes

The Bedrock section intentionally does not hard-code a separate port because your current Seedloaf/Geyser setup can change depending on how Seedloaf maps the server. Add the active Bedrock port to `index.html` if you want it displayed permanently.
