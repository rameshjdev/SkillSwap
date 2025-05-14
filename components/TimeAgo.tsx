import React from 'react';
import { Text, TextStyle } from 'react-native';

type TimeAgoProps = {
  time: string;
  style?: TextStyle;
};

export default function TimeAgo({ time, style }: TimeAgoProps) {
  const getTimeAgo = (timeString: string) => {
    const now = new Date();
    const date = new Date(timeString);
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (secondsAgo < 60) {
      return 'Just now';
    }
    
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo}m ago`;
    }
    
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo}h ago`;
    }
    
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
      return `${daysAgo}d ago`;
    }
    
    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
      return `${weeksAgo}w ago`;
    }
    
    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) {
      return `${monthsAgo}mo ago`;
    }
    
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${yearsAgo}y ago`;
  };
  
  return <Text style={style}>{getTimeAgo(time)}</Text>;
}