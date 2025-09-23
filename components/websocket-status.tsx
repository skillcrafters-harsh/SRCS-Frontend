"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  WifiIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon 
} from "@heroicons/react/24/outline";

interface WebSocketStatusProps {
  isConnected: boolean;
  isOptimizing: boolean;
  lastMessage?: string;
  className?: string;
}

export default function WebSocketStatus({ 
  isConnected, 
  isOptimizing, 
  lastMessage,
  className = "" 
}: WebSocketStatusProps) {
  const [connectionTime, setConnectionTime] = useState<Date | null>(null);

  useEffect(() => {
    if (isConnected && !connectionTime) {
      setConnectionTime(new Date());
    } else if (!isConnected) {
      setConnectionTime(null);
    }
  }, [isConnected, connectionTime]);

  const getStatusIcon = () => {
    if (isOptimizing) {
      return <ClockIcon className="h-4 w-4 text-blue-500 animate-spin" />;
    } else if (isConnected) {
      return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
    } else {
      return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = () => {
    if (isOptimizing) {
      return "Optimizing...";
    } else if (isConnected) {
      return "Connected";
    } else {
      return "Disconnected";
    }
  };

  const getStatusColor = () => {
    if (isOptimizing) {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else if (isConnected) {
      return "bg-green-100 text-green-800 border-green-200";
    } else {
      return "bg-red-100 text-red-800 border-red-200";
    }
  };

  return (
    <Card className={`${className} bg-gradient-to-r from-gray-50 to-blue-50/30`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <WifiIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">WebSocket</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <Badge 
              variant="outline" 
              className={`text-xs ${getStatusColor()}`}
            >
              {getStatusText()}
            </Badge>
          </div>
        </div>
        
        {lastMessage && (
          <div className="mt-2 text-xs text-gray-600 truncate">
            {lastMessage}
          </div>
        )}
        
        {connectionTime && (
          <div className="mt-1 text-xs text-gray-500">
            Connected at {connectionTime.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}