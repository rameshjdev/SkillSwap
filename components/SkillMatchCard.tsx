import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, Bookmark, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type SkillMatchCardProps = {
  match: {
    id: string;
    name: string;
    avatar: string;
    distance: string;
    skillOffered: string;
    skillOfferedLevel: string;
    skillNeeded: string;
    skillNeededLevel: string;
    description: string;
    rating: number;
    reviewCount: number;
  };
};

export default function SkillMatchCard({ match }: SkillMatchCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: match.avatar }} style={styles.avatar} />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />

      <TouchableOpacity style={styles.bookmarkButton}>
        <Bookmark size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.name}>{match.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color="#CBD5E1" />
              <Text style={styles.distance}>{match.distance}</Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FBBF24" />
            <Text style={styles.rating}>{match.rating}</Text>
          </View>
        </View>

        <View style={styles.skillsContainer}>
          <View style={styles.skillBox}>
            <Text style={styles.skillLabel}>OFFERING</Text>
            <Text style={styles.skillName}>{match.skillOffered}</Text>
            <View style={[styles.levelContainer, styles.offeringLevel]}>
              <Text style={styles.levelText}>{match.skillOfferedLevel}</Text>
            </View>
          </View>

          <View style={styles.exchangeIcon}>
            <Text style={styles.exchangeText}>↔</Text>
          </View>

          <View style={styles.skillBox}>
            <Text style={styles.skillLabel}>LOOKING FOR</Text>
            <Text style={styles.skillName}>{match.skillNeeded}</Text>
            <View style={[styles.levelContainer, styles.neededLevel]}>
              <Text style={[styles.levelText, styles.neededLevelText]}>
                {match.skillNeededLevel}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {match.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: '100%',
    height: '60%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 12,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    marginLeft: 4,
    fontSize: 14,
    color: '#CBD5E1',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  skillsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 16,
  },
  skillBox: {
    flex: 1,
  },
  skillLabel: {
    fontSize: 12,
    color: '#CBD5E1',
    marginBottom: 4,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  levelContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  offeringLevel: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  neededLevel: {
    backgroundColor: 'rgba(244, 63, 94, 0.2)',
  },
  levelText: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '500',
  },
  neededLevelText: {
    color: '#F43F5E',
  },
  exchangeIcon: {
    marginHorizontal: 12,
  },
  exchangeText: {
    fontSize: 20,
    color: '#CBD5E1',
  },
  description: {
    fontSize: 14,
    color: '#E2E8F0',
    lineHeight: 20,
  },
});