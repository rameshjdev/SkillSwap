import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Filter, Search } from 'lucide-react-native';
import SkillMatchCard from '../components/SkillMatchCard';
import FilterModal, { FilterOptions } from '../components/FilterModal';

// Mock data for skill matches - this would eventually be replaced with real data from your backend
const mockSkillMatches = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    distance: '2.5 miles away',
    category: 'Creative',
    availability: ['Weekends', 'Evenings'],
    skillOffered: 'Graphic Design',
    skillOfferedLevel: 'Expert',
    skillNeeded: 'Spanish Language',
    skillNeededLevel: 'Beginner',
    description: 'Ive been working as a professional graphic designer for 5 years. I can teach you everything from basic principles to advanced techniques in Adobe Creative Suite.',
    rating: 4.8,
    reviewCount: 12,
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    distance: '4.7 miles away',
    category: 'Music',
    availability: ['Weekdays', 'Mornings'],
    skillOffered: 'Piano Lessons',
    skillOfferedLevel: 'Advanced',
    skillNeeded: 'Photography',
    skillNeededLevel: 'Intermediate',
    description: 'Classical pianist with 10+ years of experience. I can help you master piano techniques, music theory, and performance skills.',
    rating: 4.9,
    reviewCount: 24,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    distance: '1.2 miles away',
    category: 'Fitness',
    availability: ['Flexible'],
    skillOffered: 'Yoga Instruction',
    skillOfferedLevel: 'Expert',
    skillNeeded: 'Web Development',
    skillNeededLevel: 'Beginner',
    description: 'Certified yoga instructor specializing in Hatha and Vinyasa. I can help you improve flexibility, strength, and mindfulness through personalized sessions.',
    rating: 4.7,
    reviewCount: 18,
  },
  {
    id: '4',
    name: 'James Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
    distance: '3.8 miles away',
    category: 'Music',
    availability: ['Weekends', 'Evenings'],
    skillOffered: 'Guitar Playing',
    skillOfferedLevel: 'Advanced',
    skillNeeded: 'Cooking',
    skillNeededLevel: 'Intermediate',
    description: 'Experienced guitarist offering lessons in acoustic, electric, and bass guitar. I can teach various styles including rock, blues, jazz, and classical.',
    rating: 4.6,
    reviewCount: 9,
  },
];

export default function HomeScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillOffers, setSkillOffers] = useState(mockSkillMatches);
  const [filteredOffers, setFilteredOffers] = useState(mockSkillMatches);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    maxDistance: 50,
    availability: [],
  });

  // Filter and search logic
  useEffect(() => {
    let results = skillOffers;
    
    // Apply search query filter
    if (searchQuery) {
      results = results.filter(offer => 
        offer.skillOffered.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.skillNeeded.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilters.categories.length > 0) {
      results = results.filter(offer => 
        activeFilters.categories.includes(offer.category)
      );
    }
    
    // Apply distance filter (simplified for mock data)
    if (activeFilters.maxDistance) {
      // In a real app, you would calculate actual distances
      // For now, we'll just filter based on the first number in the distance string
      results = results.filter(offer => {
        const distanceValue = parseFloat(offer.distance.split(' ')[0]);
        return distanceValue <= activeFilters.maxDistance;
      });
    }
    
    // Apply availability filter
    if (activeFilters.availability.length > 0) {
      results = results.filter(offer => 
        offer.availability.some(time => activeFilters.availability.includes(time))
      );
    }
    
    setFilteredOffers(results);
  }, [searchQuery, activeFilters, skillOffers]);

  // Handle filter application
  const applyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Skills</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Filter size={20} color="#333333" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#777777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search skills or people..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Active Filters Display */}
      {(activeFilters.categories.length > 0 || activeFilters.availability.length > 0) && (
        <View style={styles.activeFiltersContainer}>
          <Text style={styles.activeFiltersTitle}>Active Filters:</Text>
          <View style={styles.filterChipsContainer}>
            {activeFilters.categories.map(category => (
              <View key={`filter-${category}`} style={styles.filterChip}>
                <Text style={styles.filterChipText}>{category}</Text>
              </View>
            ))}
            {activeFilters.availability.map(availability => (
              <View key={`avail-${availability}`} style={styles.filterChip}>
                <Text style={styles.filterChipText}>{availability}</Text>
              </View>
            ))}
            <View style={styles.filterChip}>
              <Text style={styles.filterChipText}>Within {activeFilters.maxDistance} miles</Text>
            </View>
          </View>
        </View>
      )}

      <FlatList
        data={filteredOffers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <SkillMatchCard 
              match={item} 
              onPress={() => console.log('Skill match selected:', item.id)}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No skill offers match your criteria</Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery('');
                setActiveFilters({
                  categories: [],
                  maxDistance: 50,
                  availability: [],
                });
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <FilterModal 
        visible={filterModalVisible} 
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
        initialFilters={activeFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeFiltersTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  filterChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterChipText: {
    fontSize: 12,
    color: '#28693C',
  },
  listContent: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#28693C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
}); 