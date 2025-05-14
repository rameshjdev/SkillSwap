import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import TimeAgo from '@/components/TimeAgo';

type BarterPostCardProps = {
  post: {
    id: string;
    title: string;
    userName: string;
    userAvatar: string;
    skillOffered: string;
    skillNeeded: string;
    description: string;
    timePosted: string;
    location: string;
  };
};

export default function BarterPostCard({ post }: BarterPostCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>{post.userName}</Text>
          <View style={styles.locationTimeContainer}>
            <Text style={styles.location}>{post.location}</Text>
            <Text style={styles.dot}>•</Text>
            <TimeAgo time={post.timePosted} style={styles.timeAgo} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>{post.title}</Text>
      
      <View style={styles.skillsContainer}>
        <View style={styles.skillTag}>
          <Text style={styles.skillLabel}>OFFERING</Text>
          <Text style={styles.skillText}>{post.skillOffered}</Text>
        </View>
        <Text style={styles.exchangeIcon}>↔</Text>
        <View style={styles.skillTag}>
          <Text style={styles.skillLabel}>LOOKING FOR</Text>
          <Text style={styles.skillText}>{post.skillNeeded}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={3}>
        {post.description}
      </Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactButton}>
          <MessageSquare size={16} color="#FFFFFF" />
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  locationTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#666666',
  },
  dot: {
    marginHorizontal: 4,
    color: '#666666',
  },
  timeAgo: {
    fontSize: 14,
    color: '#666666',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillTag: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    padding: 8,
  },
  skillLabel: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 4,
  },
  skillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  exchangeIcon: {
    marginHorizontal: 12,
    fontSize: 18,
    color: '#999999',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    alignItems: 'flex-end',
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#12B0A0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 6,
  },
});