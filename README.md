# Roshith Amanda Perera: Portfolio and Security Services

A static website (HTML, CSS, JavaScript) presenting my cybersecurity services, including WordPress malware removal, and my Cloud Intrusion Detection & Response System project.

No build step and no dependencies. Fonts load from Google Fonts with system fallbacks.

## Files

```
index.html
css/style.css
js/main.js
README.md
```

## Run locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish on GitHub Pages (free)

1. Create a new public repository, for example `roshith-portfolio`. To get the address `roshithamanda.github.io`, name it exactly `roshithamanda.github.io`.
2. Upload all files, keeping the `css` and `js` folders, or push from the command line:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/roshithamanda/roshith-portfolio.git
git push -u origin main
```

3. In the repository go to **Settings > Pages**. Under **Build and deployment** choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute or two the site is live at `https://roshithamanda.github.io/roshith-portfolio/` (or `https://roshithamanda.github.io/` if you used the special repository name).

## Customise

- **Contact details:** search `index.html` for the email, phone and social links. The email address is also set as `TO` in `js/main.js`.
- **Colours and fonts:** edit the variables at the top of `css/style.css`.
- **Services:** edit the `.service` blocks in `index.html`.
- **Contact form:** it opens the visitor's email app with the message filled in. For a form that sends without opening an email app, use a service such as Formspree or Web3Forms and point the form's `action` at it.

## Before you go live

- Add real client testimonials and a pricing or quote section only once you have them.
- Add a custom domain under **Settings > Pages** if you buy one.
