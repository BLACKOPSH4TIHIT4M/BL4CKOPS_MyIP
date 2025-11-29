#!/bin/bash
# BL4CKOPS IP Tool - Quick Deployment Script
# Usage: ./deploy.sh [mode]
# Modes: dev, prod, docker, stop, logs

MODE=${1:-dev}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_banner() {
  echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║     🔍 BL4CKOPS IP Reconnaissance Tool - Deployer        ║${NC}"
  echo -e "${BLUE}║     Part of BL4CKOPS_OSINT by H4TIHIT4M                  ║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

check_requirements() {
  echo -e "${YELLOW}[*] Checking requirements...${NC}"
  
  if ! command -v node &> /dev/null; then
    echo -e "${RED}[!] Node.js not found. Install: https://nodejs.org${NC}"
    exit 1
  fi
  
  if ! command -v npm &> /dev/null; then
    echo -e "${RED}[!] npm not found.${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}[+] Node.js $(node --version)${NC}"
  echo -e "${GREEN}[+] npm $(npm --version)${NC}"
  echo ""
}

install_deps() {
  echo -e "${YELLOW}[*] Installing dependencies...${NC}"
  cd "$PROJECT_DIR"
  npm install
  echo -e "${GREEN}[+] Dependencies installed${NC}"
  echo ""
}

run_dev() {
  echo -e "${BLUE}[*] Starting Development Mode${NC}"
  echo -e "${GREEN}[+] Frontend: http://localhost:5173 (Vite)${NC}"
  echo -e "${GREEN}[+] Backend: http://localhost:11966${NC}"
  echo -e "${GREEN}[+] Access: http://localhost:18966${NC}"
  echo ""
  
  cd "$PROJECT_DIR"
  npm run dev
}

run_prod_build() {
  echo -e "${BLUE}[*] Building for Production${NC}"
  cd "$PROJECT_DIR"
  npm run build
  echo -e "${GREEN}[+] Build complete. Files in ./dist${NC}"
  echo ""
}

run_prod() {
  echo -e "${BLUE}[*] Starting Production Mode${NC}"
  echo -e "${YELLOW}[!] Make sure to run 'npm run build' first${NC}"
  echo -e "${GREEN}[+] Frontend: http://localhost:18966${NC}"
  echo -e "${GREEN}[+] Backend: http://localhost:11966${NC}"
  echo ""
  
  cd "$PROJECT_DIR"
  npm start
}

run_docker() {
  echo -e "${BLUE}[*] Docker Mode${NC}"
  
  if ! command -v docker &> /dev/null; then
    echo -e "${RED}[!] Docker not found. Install: https://docker.com${NC}"
    exit 1
  fi
  
  echo -e "${YELLOW}[*] Building Docker image...${NC}"
  docker build -t bl4ckops-ip-tool:5.0.0 .
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}[+] Docker image built successfully${NC}"
    echo ""
    echo -e "${YELLOW}[*] Starting container...${NC}"
    docker run -d \
      -p 18966:18966 \
      -p 11966:11966 \
      -e BACKEND_PORT=11966 \
      -e FRONTEND_PORT=18966 \
      -e ALLOWED_DOMAINS="0.0.0.0" \
      --name bl4ckops-ip-prod \
      --restart unless-stopped \
      bl4ckops-ip-tool:5.0.0
    
    echo -e "${GREEN}[+] Container started${NC}"
    echo -e "${GREEN}[+] Access: http://localhost:18966${NC}"
    docker ps | grep bl4ckops-ip-prod
  fi
  echo ""
}

stop_services() {
  echo -e "${YELLOW}[*] Stopping services...${NC}"
  
  # Stop Docker container if running
  if docker ps | grep -q bl4ckops-ip-prod; then
    echo -e "${YELLOW}[*] Stopping Docker container...${NC}"
    docker stop bl4ckops-ip-prod
    echo -e "${GREEN}[+] Container stopped${NC}"
  fi
  
  # Kill npm processes
  pkill -f "npm start" || true
  pkill -f "npm run dev" || true
  
  echo -e "${GREEN}[+] All services stopped${NC}"
  echo ""
}

show_logs() {
  echo -e "${BLUE}[*] Showing logs...${NC}"
  
  if docker ps | grep -q bl4ckops-ip-prod; then
    docker logs -f bl4ckops-ip-prod
  else
    echo -e "${YELLOW}[!] Docker container not running${NC}"
    echo -e "${YELLOW}[!] Start with: ./deploy.sh docker${NC}"
  fi
}

show_help() {
  print_banner
  echo -e "${BLUE}Usage: ./deploy.sh [mode]${NC}"
  echo ""
  echo -e "${GREEN}Modes:${NC}"
  echo -e "  ${BLUE}dev${NC}      - Development with hot-reload"
  echo -e "  ${BLUE}build${NC}    - Production build only"
  echo -e "  ${BLUE}prod${NC}     - Production mode (requires build first)"
  echo -e "  ${BLUE}docker${NC}   - Docker deployment"
  echo -e "  ${BLUE}stop${NC}     - Stop all services"
  echo -e "  ${BLUE}logs${NC}     - Show Docker logs"
  echo -e "  ${BLUE}help${NC}     - Show this help"
  echo ""
  echo -e "${YELLOW}Examples:${NC}"
  echo "  ./deploy.sh dev          # Start development"
  echo "  ./deploy.sh build        # Build for production"
  echo "  ./deploy.sh prod         # Start production server"
  echo "  ./deploy.sh docker       # Deploy with Docker"
  echo "  ./deploy.sh stop         # Stop all services"
  echo ""
  echo -e "${BLUE}Access Points:${NC}"
  echo "  Development: http://localhost:5173 (Vite)"
  echo "  Frontend: http://localhost:18966"
  echo "  Backend: http://localhost:11966"
  echo ""
  echo -e "${BLUE}Network Access:${NC}"
  echo "  Local: http://localhost:18966"
  echo "  Network: http://[YOUR_IP]:18966"
  echo ""
}

# Main
print_banner

case "$MODE" in
  dev)
    check_requirements
    install_deps
    run_dev
    ;;
  build)
    check_requirements
    install_deps
    run_prod_build
    ;;
  prod)
    check_requirements
    run_prod
    ;;
  docker)
    run_docker
    ;;
  stop)
    stop_services
    ;;
  logs)
    show_logs
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    echo -e "${RED}[!] Unknown mode: $MODE${NC}"
    show_help
    exit 1
    ;;
esac
