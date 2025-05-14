import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { X, Check } from 'lucide-react-native';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
};

const skillCategories = [
  'Technology',
  'Creative',
  'Education',
  'Home & DIY', 
  'Business',
  'Cooking',
  'Fitness',
  'Languages',
  'Music',
  'Arts & Crafts',
];

export default function FilterModal({ visible, onClose }: FilterModalProps) {
  const [distance, setDistance] = useState('15');
  const [selectedOffered, setSelectedOffered] = useState<string[]>([]);
  const [selectedLooking, setSelectedLooking] = useState<string[]>([]);

  const toggleCategoryOffered = (category: string) => {
    if (selectedOffered.includes(category)) {
      setSelectedOffered(selectedOffered.filter(item => item !== category));
    } else {
      setSelectedOffered([...selectedOffered, category]);
    }
  };

  const toggleCategoryLooking = (category: string) => {
    if (selectedLooking.includes(category)) {
      setSelectedLooking(selectedLooking.filter(item => item !== category));
    } else {
      setSelectedLooking([...selectedLooking, category]);
    }
  };

  const resetFilters = () => {
    setDistance('15');
    setSelectedOffered([]);
    setSelectedLooking([]);
  };

  const applyFilters = () => {
    // Apply filters here
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Results</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#333333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Distance</Text>
              <View style={styles.distanceContainer}>
                <TextInput
                  style={styles.distanceInput}
                  value={distance}
                  onChangeText={setDistance}
                  keyboardType="numeric"
                />
                <Text style={styles.distanceUnit}>miles</Text>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Skills Offered</Text>
              <View style={styles.categoriesContainer}>
                {skillCategories.map(category => (
                  <TouchableOpacity
                    key={`offered-${category}`}
                    style={[
                      styles.categoryChip,
                      selectedOffered.includes(category) && styles.selectedChip,
                    ]}
                    onPress={() => toggleCategoryOffered(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedOffered.includes(category) && styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                    {selectedOffered.includes(category) && (
                      <Check size={16} color="#FFFFFF" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Skills Looking For</Text>
              <View style={styles.categoriesContainer}>
                {skillCategories.map(category => (
                  <TouchableOpacity
                    key={`looking-${category}`}
                    style={[
                      styles.categoryChip,
                      selectedLooking.includes(category) && styles.selectedChip,
                    ]}
                    onPress={() => toggleCategoryLooking(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedLooking.includes(category) && styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                    {selectedLooking.includes(category) && (
                      <Check size={16} color="#FFFFFF" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  filterSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
    width: 80,
    fontSize: 16,
    marginRight: 8,
  },
  distanceUnit: {
    fontSize: 16,
    color: '#666666',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: '#12B0A0',
  },
  categoryText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  checkIcon: {
    marginLeft: 4,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#666666',
  },
  applyButton: {
    backgroundColor: '#12B0A0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});