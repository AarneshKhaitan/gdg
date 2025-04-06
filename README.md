# Financial Chat

Financial Chat is an AI-driven financial advisory platform designed to assist users with stock market analysis, trading insights, and risk management. By leveraging advanced language models and a suite of specialized tools, Financial Chat delivers comprehensive technical, fundamental, and sentiment analysis—transforming complex financial data into actionable insights through a natural language chat interface.

## Overview

Financial Chat is built around a modular architecture that separates concerns into multiple specialized components. The platform’s core is powered by an AI conversational engine that intelligently delegates tasks to various assistants, each tailored to a specific area of financial analysis. This enables the system to handle diverse requests such as stock universe scans, in-depth technical analysis, risk management calculations, and real-time market sentiment evaluation.

### Key Components

- **Conversational AI Engine:**  
  At its heart, Financial Chat features an AI conversational agent that manages dialog flow and task delegation. The engine processes user queries, selects the appropriate specialized assistant, and integrates responses from multiple tools to present a unified, coherent output.

- **Specialized Assistants:**  
  Each assistant focuses on a particular domain:
  - **Stock Scan Assistant:** Scans the market for stocks that meet pre-defined bullish criteria.
  - **Analysis Assistant:** Delivers a full analysis covering technical and fundamental metrics.
  - **Chart Analysis Assistant:** Provides visual and textual analysis of stock price trends and chart patterns.
  - **Risk Management Assistant:** Calculates technical stops, R-multiples, and optimal position sizing.
  - **Gainers/Losers Assistant:** Fetches and presents market performance data including top gainers and losers.

- **Integrated Tools and Data Sources:**  
  Financial Chat utilizes a variety of external APIs and libraries:
  - **Market Data & Financial Metrics:** Retrieves historical stock data, key ratios, and financial statements via sources like Yahoo Finance and OpenBB.
  - **Technical Analysis:** Calculates moving averages, RSI, ATR, and other technical indicators using specialized libraries and custom algorithms.
  - **Sentiment Analysis:** Analyzes news headlines and summaries using VADER and data from Alpha Vantage to gauge market sentiment.
  - **Visualization:** Generates interactive charts with Plotly and uploads images to external hosting services (e.g., Imgur) for broader accessibility.

## Features

- **Dynamic Financial Analysis:**  
  Delivering real-time insights through a blend of technical, fundamental, and sentiment analysis, the platform adapts its approach based on user input to provide the most relevant information.

- **Natural Language Interaction:**  
  Users interact with the system via a chat interface, making complex financial analysis accessible to both novice investors and seasoned professionals.

- **Customizable Risk Assessment:**  
  The risk management module calculates critical metrics such as technical stop levels, profit targets based on R-multiples, and optimal position sizes according to user-defined risk parameters.

- **Visual Data Representation:**  
  With the integration of interactive charts and graphs, users can visually explore historical data trends, technical indicators, and comparative market performance.

- **Cloud-Ready Deployment:**  
  Designed for modern cloud infrastructures, the project includes configurations for containerized deployment and orchestration using tools like Docker and AWS Copilot.

## Usage Scenarios

Financial Chat can be utilized in various contexts:
- **Individual Investors:**  
  Get detailed, on-demand analysis of specific stocks to inform trading decisions.
- **Financial Advisors:**  
  Leverage the platform’s insights and visualizations to support client recommendations.
- **Market Analysts:**  
  Access comprehensive market scans and risk assessments for a macro-level view of market trends.

## Architecture & Workflow

1. **User Interaction:**  
   Users input their queries through the chat interface, either via a Streamlit application or a Next.js frontend.

2. **Query Processing:**  
   The conversational engine preprocesses the query by correcting errors and identifying key financial entities (e.g., stock symbols, company names).

3. **Assistant Delegation:**  
   Based on the parsed query, the engine routes the request to the appropriate specialized assistant using a state graph that defines the workflow and decision criteria.

4. **Data Aggregation:**  
   Each assistant invokes one or more tools that fetch and process financial data, perform technical calculations, or analyze market sentiment.

5. **Response Synthesis:**  
   The results from various tools are aggregated and synthesized into a coherent response, which is then delivered back to the user via the chat interface.

6. **Iterative Feedback:**  
   Users can further refine their queries, prompting the system to perform additional analyses or to switch focus between different aspects of financial evaluation.

