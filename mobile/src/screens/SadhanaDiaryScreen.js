import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { colors, spacing, borderRadius } from '../theme';
import { storageService } from '../services/storageService';

export const SadhanaDiaryScreen = ({ navigation }) => {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    totalHours: '0.0',
    todayMinutes: 0,
    streakDays: 0,
    totalDays: 0,
    totalSessions: 0,
  });
  const [todayJournal, setTodayJournal] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);

  const loadData = async () => {
    const sList = await storageService.getSessions();
    const st = await storageService.getStats();
    const log = await storageService.getDailyLog();
    setSessions(sList);
    setStats(st);
    if (log?.reflectionJournal) {
      setTodayJournal(log.reflectionJournal);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation?.addListener ? navigation.addListener('focus', loadData) : null;
    loadData();
    return unsubscribe;
  }, [navigation]);

  const saveJournal = async () => {
    const log = (await storageService.getDailyLog()) || {};
    await storageService.saveDailyLog({
      ...log,
      reflectionJournal: todayJournal,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.sacredHeading}>॥ साधना डायरी एवं संकल्प ॥</Text>
          <Text style={styles.subHeading}>Daily Reflection, Streaks & Session History</Text>
        </View>

        {/* Streaks Card */}
        <View style={styles.streaksCard}>
          <View style={styles.streakHeader}>
            <Text style={styles.flameEmoji}>🔥</Text>
            <View>
              <Text style={styles.streakTitle}>{stats.streakDays} दिन निरंतर साधना</Text>
              <Text style={styles.streakSub}>अविरल नाम-सिमरन संकल्प</Text>
            </View>
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{stats.totalHours}</Text>
              <Text style={styles.metricLabel}>कुल घंटे (Hours)</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{stats.totalDays}</Text>
              <Text style={styles.metricLabel}>कुल दिवस (Days)</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{stats.totalSessions}</Text>
              <Text style={styles.metricLabel}>कुल सत्र (Sessions)</Text>
            </View>
          </View>
        </View>

        {/* Today's Spiritual Reflection Journal */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>आज का आत्म-निरीक्षण एवं गुरु-स्मरण</Text>
          <Text style={styles.cardSub}>
            आज के दिन मन में क्या विचार आए? क्या किसी का दिल दुखाया? कल के लिए क्या सुधार करना है?
          </Text>

          <TextInput
            style={styles.journalInput}
            multiline
            numberOfLines={4}
            placeholder="आज की डायरी यहाँ लिखें (Your spiritual reflection)..."
            placeholderTextColor={colors.stone[400]}
            value={todayJournal}
            onChangeText={setTodayJournal}
          />

          <View style={styles.saveRow}>
            {savedMessage && (
              <Text style={styles.savedBadge}>✓ डायरी सुरक्षित हुई (Saved)</Text>
            )}
            <TouchableOpacity style={styles.saveBtn} onPress={saveJournal}>
              <Text style={styles.saveBtnText}>सुरक्षित करें (Save)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Sadhana History */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>साधना इतिहास (Recent Sessions)</Text>

          {sessions.length > 0 ? (
            <View style={styles.sessionList}>
              {sessions.slice(0, 10).map((item) => (
                <View key={item.id} style={styles.sessionItem}>
                  <View style={styles.sessionLeft}>
                    <Text style={styles.sessionType}>{item.type}</Text>
                    <Text style={styles.sessionDate}>
                      {new Date(item.date).toLocaleDateString('hi-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Text>
                    {item.notes ? (
                      <Text style={styles.sessionNotes}>"{item.notes}"</Text>
                    ) : null}
                  </View>

                  <View style={styles.sessionBadge}>
                    <Text style={styles.sessionDuration}>
                      {item.durationMinutes} min
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>
              अभी कोई ध्यान सत्र दर्ज नहीं हुआ है। कृपया 'नाम-ध्यान' टैब से प्रारंभ करें।
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream[50],
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  sacredHeading: {
    color: colors.maroon[800],
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subHeading: {
    color: colors.stone[500],
    fontSize: 12,
    marginTop: 2,
  },
  streaksCard: {
    backgroundColor: colors.maroon[900],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(234, 183, 59, 0.3)',
    gap: spacing.md,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  flameEmoji: {
    fontSize: 32,
  },
  streakTitle: {
    color: colors.gold[300],
    fontSize: 18,
    fontWeight: 'bold',
  },
  streakSub: {
    color: colors.roseBlush[100],
    fontSize: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: spacing.sm,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricLabel: {
    color: colors.roseBlush[200],
    fontSize: 10,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    gap: spacing.sm,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.stone[900],
  },
  cardSub: {
    fontSize: 11,
    color: colors.stone[500],
    lineHeight: 16,
  },
  journalInput: {
    backgroundColor: colors.stone[50],
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 12,
    color: colors.stone[800],
    textAlignVertical: 'top',
    minHeight: 80,
  },
  saveRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  savedBadge: {
    color: colors.success,
    fontSize: 11,
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: colors.maroon[700],
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: borderRadius.full,
  },
  saveBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sessionList: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.stone[100],
  },
  sessionLeft: {
    flex: 1,
    gap: 2,
  },
  sessionType: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.stone[800],
  },
  sessionDate: {
    fontSize: 11,
    color: colors.stone[400],
  },
  sessionNotes: {
    fontSize: 11,
    color: colors.maroon[700],
    fontStyle: 'italic',
    marginTop: 2,
  },
  sessionBadge: {
    backgroundColor: colors.roseBlush[50],
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: borderRadius.sm,
  },
  sessionDuration: {
    color: colors.maroon[800],
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 12,
    color: colors.stone[400],
    textAlign: 'center',
    paddingVertical: spacing.md,
    fontStyle: 'italic',
  },
});

export default SadhanaDiaryScreen;
