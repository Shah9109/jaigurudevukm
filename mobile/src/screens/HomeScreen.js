import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors, spacing, borderRadius } from '../theme';
import { storageService } from '../services/storageService';

export const HomeScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    totalHours: '0.0',
    todayMinutes: 0,
    streakDays: 0,
  });
  const [dailyLog, setDailyLog] = useState({
    amritVelaCompleted: false,
    sandhyaAartiCompleted: false,
    shakaharPledge: true,
  });

  const loadData = async () => {
    const s = await storageService.getStats();
    const l = await storageService.getDailyLog();
    setStats(s);
    if (l) setDailyLog(l);
  };

  useEffect(() => {
    const unsubscribe = navigation?.addListener ? navigation.addListener('focus', loadData) : null;
    loadData();
    return unsubscribe;
  }, [navigation]);

  const toggleChecklist = async (field) => {
    const updated = { ...dailyLog, [field]: !dailyLog[field] };
    setDailyLog(updated);
    await storageService.saveDailyLog(updated);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.maroon[900]} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Devotional Header Banner */}
        <View style={styles.headerCard}>
          <Text style={styles.sacredMantra}>॥ जयगुरुदेव ॥</Text>
          <Text style={styles.greetingTitle}>साधना साथी (Daily Companion)</Text>
          <Text style={styles.greetingSubtitle}>
            "मन, वचन और कर्म से जीवों पर दया करें और नित्य नाम-साधना में लीन रहें।"
          </Text>

          <TouchableOpacity
            style={styles.startTimerBtn}
            onPress={() => navigation.navigate('DhyanTimer')}
          >
            <Text style={styles.startTimerBtnText}>▶ प्रारंभ करें नाम-ध्यान (Start)</Text>
          </TouchableOpacity>
        </View>

        {/* Sadhana Metrics Strip */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.streakDays}</Text>
            <Text style={styles.statLabel}>🔥 दिन लगातार (Streak)</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.todayMinutes}m</Text>
            <Text style={styles.statLabel}>⏱ आज का ध्यान</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.totalHours}h</Text>
            <Text style={styles.statLabel}>🧘 कुल साधना समय</Text>
          </View>
        </View>

        {/* Daily Discipline Checklist */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>दैनिक साधना नियम (Daily Discipline)</Text>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => toggleChecklist('amritVelaCompleted')}
          >
            <View style={[styles.checkbox, dailyLog.amritVelaCompleted && styles.checkboxActive]}>
              {dailyLog.amritVelaCompleted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.checkItemText}>
              <Text style={styles.checkTitle}>प्रातः कालीन नाम-सिमरन (अमृत वेला)</Text>
              <Text style={styles.checkSubtitle}>03:00 AM - 05:00 AM</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => toggleChecklist('sandhyaAartiCompleted')}
          >
            <View style={[styles.checkbox, dailyLog.sandhyaAartiCompleted && styles.checkboxActive]}>
              {dailyLog.sandhyaAartiCompleted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.checkItemText}>
              <Text style={styles.checkTitle}>सायंकालीन आरती एवं प्रार्थना</Text>
              <Text style={styles.checkSubtitle}>06:30 PM - 07:30 PM</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => toggleChecklist('shakaharPledge')}
          >
            <View style={[styles.checkbox, dailyLog.shakaharPledge && styles.checkboxActive]}>
              {dailyLog.shakaharPledge && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.checkItemText}>
              <Text style={styles.checkTitle}>पूर्ण शाकाहार एवं नशामुक्त जीवन संकल्प</Text>
              <Text style={styles.checkSubtitle}>जीव दया एवं सदाचार</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Access to Liturgy and Ashram Guide */}
        <View style={styles.gridRow}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate('Prayers')}
          >
            <Text style={styles.quickIcon}>📖</Text>
            <Text style={styles.quickTitle}>नित्य प्रार्थना एवं आरती</Text>
            <Text style={styles.quickSubtitle}>Offline Prayers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate('AshramGuide')}
          >
            <Text style={styles.quickIcon}>🏛️</Text>
            <Text style={styles.quickTitle}>मथुरा आश्रम निर्देशिका</Text>
            <Text style={styles.quickSubtitle}>Helpline & Guide</Text>
          </TouchableOpacity>
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
  headerCard: {
    backgroundColor: colors.maroon[900],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(234, 183, 59, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  sacredMantra: {
    color: colors.gold[400],
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  greetingTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  greetingSubtitle: {
    color: colors.roseBlush[100],
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  startTimerBtn: {
    backgroundColor: colors.gold[400],
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    shadowColor: colors.gold[700],
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  startTimerBtnText: {
    color: colors.maroon[950],
    fontSize: 13,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.maroon[800],
  },
  statLabel: {
    fontSize: 10,
    color: colors.stone[500],
    marginTop: 4,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    gap: spacing.md,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.stone[900],
    borderBottomWidth: 1,
    borderBottomColor: colors.roseBlush[50],
    paddingBottom: spacing.sm,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.stone[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.maroon[700],
    borderColor: colors.maroon[700],
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkItemText: {
    flex: 1,
  },
  checkTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.stone[800],
  },
  checkSubtitle: {
    fontSize: 11,
    color: colors.stone[400],
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    alignItems: 'center',
    gap: 4,
  },
  quickIcon: {
    fontSize: 24,
  },
  quickTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.stone[800],
    textAlign: 'center',
  },
  quickSubtitle: {
    fontSize: 10,
    color: colors.stone[400],
  },
});

export default HomeScreen;
