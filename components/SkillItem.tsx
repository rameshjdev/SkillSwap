import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CreditCard as Edit2, Trash2 } from 'lucide-react-native';

type SkillItemProps = {
  skill: {
    id: string;
    name: string;
    category: string;
    level: string;
    description: string;
    reviews?: number;
  };
  type: 'offering' | 'needed';
};

export default function SkillItem({ skill, type }: SkillItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.skillName}>{skill.name}</Text>
          <View style={styles.infoRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{skill.category}</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{skill.level}</Text>
            </View>
            {skill.reviews && (
              <Text style={styles.reviewsText}>{skill.reviews} reviews</Text>
            )}
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit2 size={16} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Trash2 size={16} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.description}>{skill.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
  },
  levelBadge: {
    backgroundColor: '#EDF7F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  levelText: {
    fontSize: 12,
    color: '#12B0A0',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});