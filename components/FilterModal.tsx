import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { X, Check } from 'lucide-react-native';
import { Slider } from 'react-native-elements';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
};

export type FilterOptions = {
  categories: string[];
  maxDistance: number;
  availability: string[];
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

const availabilityOptions = [
  'Weekdays',
  'Weekends',
  'Evenings',
  'Mornings',
  'Flexible',
];

export default function FilterModal({ visible, onClose, onApply, initialFilters }: FilterModalProps) {
  const [distance, setDistance] = useState(initialFilters?.maxDistance || 15);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters?.categories || []);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(initialFilters?.availability || []);

  useEffect(() => {
    if (initialFilters) {
      setDistance(initialFilters.maxDistance);
      setSelectedCategories(initialFilters.categories || []);
      setSelectedAvailability(initialFilters.availability || []);
    }
  }, [initialFilters, visible]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleAvailability = (option: string) => {
    if (selectedAvailability.includes(option)) {
      setSelectedAvailability(selectedAvailability.filter(item => item !== option));
    } else {
      setSelectedAvailability([...selectedAvailability, option]);
    }
  };

  const resetFilters = () => {
    setDistance(15);
    setSelectedCategories([]);
    setSelectedAvailability([]);
  };

  const applyFilters = () => {
    onApply({
      categories: selectedCategories,
      maxDistance: distance,
      availability: selectedAvailability,
    });
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
              <Text style={styles.sectionTitle}>Maximum Distance</Text>
              <View style={styles.distanceContainer}>
                <Slider
                  value={distance}
                  onValueChange={(value) => setDistance(value)}
                  minimumValue={1}
                  maximumValue={100}
                  step={1}
                  thumbStyle={styles.sliderThumb}
                  trackStyle={styles.sliderTrack}
                  minimumTrackTintColor="#28693C"
                  thumbTintColor="#28693C"
                  style={styles.slider}
                />
                <View style={styles.distanceTextContainer}>
                  <Text style={styles.distanceValue}>{distance} miles</Text>
                </View>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Skill Categories</Text>
              <View style={styles.categoriesContainer}>
                {skillCategories.map(category => (
                  <TouchableOpacity
                    key={`category-${category}`}
                    style={[
                      styles.categoryChip,
                      selectedCategories.includes(category) && styles.selectedChip,
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategories.includes(category) && styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                    {selectedCategories.includes(category) && (
                      <Check size={16} color="#FFFFFF" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Availability</Text>
              <View style={styles.categoriesContainer}>
                {availabilityOptions.map(option => (
                  <TouchableOpacity
                    key={`availability-${option}`}
                    style={[
                      styles.categoryChip,
                      selectedAvailability.includes(option) && styles.selectedChip,
                    ]}
                    onPress={() => toggleAvailability(option)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedAvailability.includes(option) && styles.selectedCategoryText,
                      ]}
                    >
                      {option}
                    </Text>
                    {selectedAvailability.includes(option) && (
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
    marginHorizontal: 8,
  },
  slider: {
    height: 40,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
  },
  distanceTextContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  distanceValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#28693C',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#28693C',
  },
  categoryText: {
    fontSize: 14,
    color: '#333333',
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#28693C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});