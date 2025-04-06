# Financial Chat

Financial Chat is an AI-powered financial advisor designed to help users with stock market analysis, trading insights, and risk management. The system leverages multiple specialized assistants to provide technical analysis, fundamental metrics, sentiment analysis, and more—all via natural language chat interfaces.

## Overview

The project is composed of two main components:

- **Backend (financial-chat):**  
  Contains the application logic, including agent chains, tools for fetching stock data, performing technical analysis, risk management calculations, and integrations with external APIs. It provides a FastAPI server that processes user queries and returns analysis results.
  
- **Frontend (nextjs-frontend):**  
  A Next.js-based user interface that allows users to interact with the AI financial advisor through a chat interface. The UI provides visualizations (charts, news grids) and handles user input.

## Features

- **AI-Powered Financial Analysis:**  
  Uses advanced language models and custom tools to deliver real-time financial insights.
  
- **Multi-Assistant Architecture:**  
  Delegates specialized tasks to assistants (e.g., full analysis, chart analysis, risk management) based on the user's query.
  
- **Technical and Fundamental Tools:**  
  Offers functions to fetch price history, calculate technical indicators (SMA, RSI, ATR), compute risk metrics, and analyze news sentiment.
  
- **Visualization:**  
  Generates interactive charts using Plotly and supports image uploads to Imgur for external viewing.
  
- **Deployment Ready:**  
  Includes Dockerfiles and AWS Copilot manifests for containerized deployments and cloud-based infrastructure.

## Directory Structure

financial-chat/
  app/
    chains/
      agent.py            # Agent definitions and conversation flow
      clear_results.py    # Utility to clear previous chat outputs in Streamlit
      templates.py        # Chat prompt templates for various analyses
    features/
      chart.py            # Chart generation and visualization
      screener.py         # Stock screener integration using FinViz
      technical.py        # Calculation of technical indicators and trendlines
    tools/
      risk_management.py      # Risk calculations including stops and position sizing
      stock_charts.py         # Stock chart analysis tool
      stock_relative_strength.py  # Relative strength calculations
      stock_sentiment.py      # News sentiment analysis using VADER and Alpha Vantage
      stock_stats.py          # Stock metrics and financial data retrieval
      types.py                # Pydantic models for input validation
      utils.py                # Utility functions for data handling
    server.py            # FastAPI server entry point
    ui.py                # Streamlit-based UI for interactive chat
  copilot/                # AWS Copilot deployment manifests for different services
    financial-chat-api/   # Backend deployment configuration
    financial-chat-ui/    # Frontend deployment configuration
  nextjs-frontend/        # Next.js frontend codebase
    app/                 # Next.js pages and components
    components/          # Reusable UI components (charts, chat, news, UI elements)
    context/             # Application context for state management
    lib/                 # API calls and mock data
    public/              # Public assets (images, SVGs)

## Chat Interaction

- **Streamlit UI:**  
  Visit the Streamlit application (configured in `ui.py`) to chat with the AI financial advisor.

- **Next.js Frontend:**  
  Provides a modern UI with support for interactive visualizations and detailed analysis outputs.

## Deployment

- **Docker:**  
  Use the provided `api.dockerfile` and `ui.dockerfile` to build container images for the backend and frontend respectively.

- **AWS Copilot:**  
  The `copilot/` directory contains manifests for deploying the Financial Chat API and UI as load balanced web services.

