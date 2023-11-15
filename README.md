## Introduction

This is the questionnaires for Trend Micro use.
If you have any suggestions, please get in touch with us. Thank you!

## Resource

- React
- NextUI
- Tailwind CSS
- React Hook Form
- React Icons
- React i18next

## How to run on your local

1. Install docker

2. Run Docker images

   ```bash
   make up.web
   ```

   or

   ```bash
   docker-compose up web -d
   ```

3. Run access docker container

   ```bash
   make exec.web
   ```

   or

   ```bash
   docker exec -it questionnaires-web /bin/bash
   ```

4. Install packages

   ```bash
   npm i
   ```

5. Run CSS monitor

   ```bash
   npm run css
   ```

6. Run develop server (using other term or stop CSS monitor)

   ```bash
   npm start
   ```

7. Go to website via your browser

   ```
   localhost:8008
   ```

8. Enjoy!
