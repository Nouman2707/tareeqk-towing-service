import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, TowingRequest } from '../types';
import { towingRequestAPI } from '../services/api';
import { colors } from '../styles/colors';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import Feather from 'react-native-vector-icons/Feather';

type RequestDetailNavigationProp = StackNavigationProp<RootStackParamList, 'RequestDetail'>;
type RequestDetailRouteProp = RouteProp<RootStackParamList, 'RequestDetail'>;

interface Props {
  navigation: RequestDetailNavigationProp;
  route: RequestDetailRouteProp;
}

interface ActionButton {
  status: string;
  label: string;
  backgroundColor: string;
  icon: React.ReactNode;
}

const RequestDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { requestId } = route.params;
  const [request, setRequest] = useState<TowingRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchRequestDetail();
  }, [requestId]);

  const fetchRequestDetail = async () => {
    try {
      const response = await towingRequestAPI.getById(requestId);
      if (response.success && response.data) {
        setRequest(response.data);
      } else {
        Alert.alert('Error', response.message || 'Failed to fetch request details');
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert('Network Error', 'Unable to fetch request details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (newStatus: string) => {
    if (!request) return;

    const statusLabels: { [key: string]: string } = {
      accepted: 'Accepted',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };

    Alert.alert(
      'Confirm Status Update',
      `Are you sure you want to mark this request as ${statusLabels[newStatus]}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            setUpdating(true);
            try {
              const response = await towingRequestAPI.updateStatus(request.id, newStatus);
              if (response.success && response.data) {
                setRequest(response.data);
                Alert.alert('Success', 'Request status updated successfully');
              } else {
                Alert.alert('Error', response.message || 'Failed to update status');
              }
            } catch (error: any) {
              Alert.alert('Network Error', 'Unable to update request status');
            } finally {
              setUpdating(false);
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getAvailableActions = (): ActionButton[] => {
    if (!request) return [];

    switch (request.status) {
      case 'pending':
        return [
          {
            status: 'accepted',
            label: 'Accept Request',
            backgroundColor: colors.blue[600],
            icon: <Feather name="check" size={16} color="#fff" />,
          },
          {
            status: 'cancelled',
            label: 'Cancel Request',
            backgroundColor: colors.red[600],
            icon: <Feather name="x" size={16} color="#fff" />,
          },
        ];
      case 'accepted':
        return [
          {
            status: 'in_progress',
            label: 'Start Service',
            backgroundColor: colors.orange[600],
            icon: <Feather name="play" size={16} color="#fff" />,
          },
          {
            status: 'cancelled',
            label: 'Cancel Request',
            backgroundColor: colors.red[600],
            icon: <Feather name="x" size={16} color="#fff" />,
          },
        ];
      case 'in_progress':
        return [
          {
            status: 'completed',
            label: 'Complete Service',
            backgroundColor: colors.green[600],
            icon: <Feather name="check-circle" size={16} color="#fff" />,
          },
        ];
      default:
        return [];
    }
  };

  const handleCall = () => {
    Alert.alert('Call Customer', 'Would call customer in real app');
  };

  const handleNavigate = () => {
    if (request) {
      Alert.alert('Navigate', `Would navigate to: ${request.location}`);
    }
  };

  if (loading) return <LoadingSpinner message="Loading request details..." />;

  if (!request) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Feather name="alert-triangle" size={48} color={colors.red[500]} />
        <Text style={styles.notFoundText}>Request not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary[600]} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.headerLeft}>
              <Text style={styles.customerName}>{request.customer_name}</Text>
              <Text style={styles.requestId}>Request #{request.id}</Text>
            </View>
            <StatusBadge status={request.status} />
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailText}>{request.location}</Text>

            {request.note && (
              <>
                <Text style={styles.detailLabel}>Additional Notes</Text>
                <Text style={styles.detailText}>{request.note}</Text>
              </>
            )}

            <Text style={styles.detailLabel}>Request Time</Text>
            <Text style={styles.detailText}>{formatDate(request.created_at)}</Text>

            {request.updated_at !== request.created_at && (
              <>
                <Text style={styles.detailLabel}>Last Updated</Text>
                <Text style={styles.detailText}>{formatDate(request.updated_at)}</Text>
              </>
            )}
          </View>

          {getAvailableActions().length > 0 && (
            <View style={styles.actionsContainer}>
              {getAvailableActions().map((action) => (
                <TouchableOpacity
                  key={action.status}
                  style={[styles.actionButton, { backgroundColor: action.backgroundColor }]}
                  onPress={() => updateRequestStatus(action.status)}
                  disabled={updating}
                >
                  {updating ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      {action.icon}
                      <Text style={styles.actionText}>{action.label}</Text>
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.green[600] }]} onPress={handleCall}>
              <Feather name="phone-call" size={16} color="#fff" />
              <Text style={styles.quickActionText}>Call Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.blue[600] }]} onPress={handleNavigate}>
              <Feather name="map-pin" size={16} color="#fff" />
              <Text style={styles.quickActionText}>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.primary[600] }]} onPress={() => Alert.alert('SMS', 'Would send SMS to customer')}>
              <Feather name="message-circle" size={16} color="#fff" />
              <Text style={styles.quickActionText}>Send SMS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray[50] },
  scrollView: { flex: 1 },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: { fontSize: 18, color: colors.gray[600], marginTop: 8 },
  card: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: { flex: 1 },
  customerName: { fontSize: 20, fontWeight: 'bold', color: colors.gray[900] },
  requestId: { fontSize: 14, color: colors.gray[600] },
  cardBody: { gap: 12 },
  detailLabel: { fontSize: 14, fontWeight: '500', color: colors.gray[700] },
  detailText: { fontSize: 16, color: colors.gray[900] },
  actionsContainer: { marginTop: 16, gap: 12 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  quickActionsTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  quickActionsContainer: { gap: 12 },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  quickActionText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default RequestDetailScreen;
