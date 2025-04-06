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
|__app/
|   |_chains/
|   |  |_agent.py            # Agent definitions and conversation flow
|   |  |_clear_results.py    # Utility to clear previous chat outputs in Streamlit
|   |  |_templates.py        # Chat prompt templates for various analyses
|   |_features/
|   |  |_chart.py            # Chart generation and visualization
|   |  |_screener.py         # Stock screener integration using FinViz
|   |  |_technical.py        # Calculation of technical indicators and trendlines
|   |_tools/
|   |  |_risk_management.py      # Risk calculations including stops and position sizing
|   |  |_stock_charts.py         # Stock chart analysis tool
|   |  |_stock_relative_strength.py  # Relative strength calculations
|   |  |_stock_sentiment.py      # News sentiment analysis using VADER and Alpha Vantage
|   |  |_stock_stats.py          # Stock metrics and financial data retrieval
|   |  |_types.py                # Pydantic models for input validation
|   |  |_utils.py                # Utility functions for data handling
|   |_server.py            # FastAPI server entry point
|   |_ui.py                # Streamlit-based UI for interactive chat
|__copilot/                # AWS Copilot deployment manifests for different services
    |_financial-chat-api/   # Backend deployment configuration
    |_financial-chat-ui/    # Frontend deployment configuration

nextjs-frontend/        # Next.js frontend codebase
|__app/                 # Next.js pages and components
|__components/          # Reusable UI components (charts, chat, news, UI elements)
|__context/             # Application context for state management
|__lib/                 # API calls and mock data
|__public/              # Public assets (images, SVGs)

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

