import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, TowingRequest } from '../types';
import { towingRequestAPI } from '../services/api';
import { colors } from '../styles/colors';
import RequestCard from '../components/RequestCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [requests, setRequests] = useState<TowingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const filterOptions = [
    { key: 'all', label: 'All', icon: <Feather name="list" size={14} /> },
    { key: 'pending', label: 'Pending', icon: <Feather name="clock" size={14} /> },
    { key: 'accepted', label: 'Accepted', icon: <Feather name="check-circle" size={14} /> },
    { key: 'in_progress', label: 'In Progress', icon: <Feather name="refresh-cw" size={14} /> },
  ];

  const fetchRequests = useCallback(async () => {
    try {
      const response = await towingRequestAPI.getAll();
      if (response.success && response.data) {
        setRequests(response.data);
      } else {
        Alert.alert('Error', response.message || 'Failed to fetch requests');
      }
    } catch (error: any) {
      console.error('Fetch requests error:', error);
      Alert.alert(
        'Network Error',
        'Unable to connect to the server. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const getFilterButtonStyle = (filterType: string) => {
    return filter === filterType ? styles.filterButtonActive : styles.filterButton;
  };

  const getFilterTextStyle = (filterType: string) => {
    return filter === filterType ? styles.filterTextActive : styles.filterText;
  };

  const renderRequestItem = ({ item }: { item: TowingRequest }) => (
    <RequestCard
      request={item}
      onPress={() => navigation.navigate('RequestDetail', { requestId: item.id })}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <FontAwesome5 name="car-crash" size={64} color={colors.gray[300]} style={{ marginBottom: 16 }} />
      <Text style={styles.emptyStateTitle}>No Requests Found</Text>
      <Text style={styles.emptyStateSubtitle}>
        {filter === 'all'
          ? 'There are no towing requests at the moment.'
          : `No ${filter.replace('_', ' ')} requests found.`}
      </Text>
      <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
        <Feather name="refresh-ccw" size={16} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Towing Requests</Text>
          <Text style={styles.headerSubtitle}>
            {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''} found
          </Text>
        </View>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshIconButton}>
          <Feather name="refresh-ccw" size={18} color={colors.primary[600]} />
        </TouchableOpacity>
      </View>
      
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {filterOptions.map((filterOption) => (
          <TouchableOpacity
            key={filterOption.key}
            onPress={() => setFilter(filterOption.key)}
            style={getFilterButtonStyle(filterOption.key)}
          >
            {React.cloneElement(filterOption.icon, {
              color: filter === filterOption.key ? 'white' : colors.gray[700],
            })}
            <Text
              style={[
                styles.filterButtonText,
                getFilterTextStyle(filterOption.key),
              ]}
            >
              {filterOption.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerTitle}>
        <Feather name="bar-chart-2" size={14} color={colors.gray[600]} />
        Request Statistics
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumberYellow}>
            {requests.filter(r => r.status === 'pending').length}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumberOrange}>
            {requests.filter(r => r.status === 'in_progress').length}
          </Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumberGreen}>
            {requests.filter(r => r.status === 'completed').length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumberGray}>
            {requests.length}
          </Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <LoadingSpinner message="Loading towing requests..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary[600]} />
      
      <FlatList
        data={filteredRequests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={filteredRequests.length > 0 ? renderFooter : null}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    marginBottom: 16,
    borderRadius: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[900],
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 4,
  },
  refreshIconButton: {
    backgroundColor: colors.primary[100],
    padding: 8,
    borderRadius: 20,
  },
  refreshIconSmall: {
    fontSize: 18,
    color: colors.primary[600],
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray[300],
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonActive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary[600],
    backgroundColor: colors.primary[600],
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  filterText: {
    color: colors.gray[700],
  },
  filterTextActive: {
    color: 'white',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshIcon: {
    color: 'white',
    marginRight: 8,
  },
  refreshText: {
    color: 'white',
    fontWeight: '500',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    marginTop: 16,
    borderRadius: 8,
  },
  footerTitle: {
    textAlign: 'center',
    color: colors.gray[600],
    fontSize: 14,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumberYellow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.yellow[600],
  },
  statNumberOrange: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.orange[600],
  },
  statNumberGreen: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.green[600],
  },
  statNumberGray: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[600],
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 2,
  },
});

export default HomeScreen;