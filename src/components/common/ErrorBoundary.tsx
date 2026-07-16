"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { RetryUI } from "@/components/common/RetryUI";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => this.setState({ hasError: false, error: undefined });

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <RetryUI
          title="Something went wrong"
          message={this.state.error?.message ?? "An unexpected error occurred."}
          onRetry={this.handleReset}
        />
      );
    }
    return this.props.children;
  }
}
