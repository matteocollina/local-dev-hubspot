# Sviluppo in locale

## Prerequisiti

1. Installa estensione app HubSpot nel proprio IDE che ti offrirà tantissime funzioni utili come il completamento automatico, le voci del menu contestuale:
https://developers.hubspot.com/docs/developer-tooling/local-development/vs-code-extension#hubl-language-support

2. Per abilitare il supporto linguistico HubL nei tuoi file, configura le impostazioni di associazione dei file di VS Code:
    2.1 Crea una cartella .vscode
    2.2 Crea un file `settings.json` con il seguente contenuto:

```json
{
    "files.associations": {
        "html-hubl": "html",
        "css-hubl": "css",
        "*.html": "html-hubl",
        "*.css": "css-hubl"
    }
}
```
## Development 

1. Creazione auth config file
hs init

2. Copiare il token e incollalo nel terminale

3. Crea la cartella del tema
```bash
mkdir local-dev-hubspot-theme
```

4. Crea la cartella su HS
```bash
hs create website-theme local-dev-hubspot-theme
```

5. Carica su HS
```bash
hs cms upload local-dev-hubspot-theme local-dev-hubspot-theme
```
ti restituisce il preview url: https://app.hubspot.com/theme-editor/5080604/edit/local-dev-hubspot-theme


6. Modifica le info (es. nome) del tema in `theme.json`

7. Esegui il watch delle modifiche
```bash
hs cms watch local-dev-hubspot-theme local-dev-hubspot-theme --initial-upload
```