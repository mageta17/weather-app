# Weather App

A Vue 3 weather application with Tailwind CSS, running in Docker with Nginx as a reverse proxy.

## Features

- Vue 3 + Vite for fast development
- Tailwind CSS for styling
- Hot reload in Docker
- Nginx reverse proxy for local development

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

### Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Start the app:**
   ```sh
   docker compose up --build
   ```

3. **Access the app:**
   - Frontend: [http://localhost:80](http://localhost:80) (via Nginx)
   - Vite dev server (direct): [http://localhost:5173](http://localhost:5173)

4. **Hot Reload:**
   - Edit files in `frontend/src/` and see changes instantly in your browser.

### Useful Commands

- **Stop the app:**
  ```sh
  docker compose down
  ```

- **Rebuild after dependency changes:**
  ```sh
  docker compose down -v
  docker compose up --build
  ```

### Project Structure

```
weather-app/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── src/
├── nginx/
│   └── default.conf
```

### Notes

- All npm/npx commands should be run inside the container:
  ```sh
  docker compose exec frontend sh
  ```
- For production, update the Nginx config and build the Vue app with `npm run build`.

---

**Enjoy developing your weather app!**