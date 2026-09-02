import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { colors, spacing, borderRadius } from '../theme';
import { storageService } from '../services/storageService';

export const AshramGuideScreen = () => {
  const [exportMessage, setExportMessage] = useState(false);

  const dialPhone = (num) => {
    Linking.openURL(`tel:${num}`).catch(() => {
      Alert.alert('Helpline', `Please dial: ${num}`);
    });
  };

  const openMap = () => {
    const url = 'https://www.google.com/maps/search/?api=1&query=Jaigurudev+Ashram+Mathura+NH-19';
    Linking.openURL(url).catch(() => {});
  };

  const handleExportData = async () => {
    try {
      const sessions = await storageService.getSessions();
      const stats = await storageService.getStats();
      const backupData = JSON.stringify({ stats, sessions }, null, 2);
      Alert.alert(
        'Offline Sadhana Backup',
        `Successfully compiled ${sessions.length} meditation sessions and ${stats.totalHours} total hours. Data is 100% local on your device.`
      );
    } catch (e) {
      Alert.alert('Error', 'Could not export local backup.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.sacredHeading}>॥ मथुरा आश्रम निर्देशिका ॥</Text>
          <Text style={styles.subHeading}>Mathura Ashram Visitor Guide & Helplines</Text>
        </View>

        {/* Central Ashram Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroSacred}>मुख्य पावन तपोभूमि</Text>
          <Text style={styles.heroTitle}>जयगुरुदेव आश्रम, मथुरा (उ.प्र.)</Text>
          <Text style={styles.heroAddress}>
            मथुरा-दिल्ली राष्ट्रीय राजमार्ग (NH-19), मथुरा, उत्तर प्रदेश - 281001
          </Text>

          <TouchableOpacity style={styles.mapBtn} onPress={openMap}>
            <Text style={styles.mapBtnText}>📍 गूगल मैप्स पर दिशा देखें (Open Map)</Text>
          </TouchableOpacity>
        </View>

        {/* Direct One-Tap Helplines */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>आपातकालीन एवं आश्रम दूरभाष (Helplines)</Text>

          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => dialPhone('+919876543210')}
          >
            <View style={styles.phoneIconBox}>
              <Text style={styles.phoneIcon}>📞</Text>
            </View>
            <View style={styles.contactText}>
              <Text style={styles.contactTitle}>केंद्रीय कार्यालय (Central Office)</Text>
              <Text style={styles.contactNumber}>+91-9876543210</Text>
            </View>
            <Text style={styles.callBadge}>कॉल करें</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => dialPhone('+919876543211')}
          >
            <View style={styles.phoneIconBox}>
              <Text style={styles.phoneIcon}>📞</Text>
            </View>
            <View style={styles.contactText}>
              <Text style={styles.contactTitle}>आवास एवं लंगर व्यवस्था (Accommodation)</Text>
              <Text style={styles.contactNumber}>+91-9876543211</Text>
            </View>
            <Text style={styles.callBadge}>कॉल करें</Text>
          </TouchableOpacity>
        </View>

        {/* Visitor Rules & Facilities */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>आश्रम नियम एवं सुविधाएं (Visitor Rules)</Text>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleBullet}>🍲</Text>
            <View style={styles.ruleText}>
              <Text style={styles.ruleTitle}>अखंड भंडारा एवं निशुल्क लंगर</Text>
              <Text style={styles.ruleDesc}>
                सभी दर्शनार्थियों के लिए 365 दिन शुद्ध, सात्विक भोजन प्रसाद की निशुल्क व्यवस्था।
              </Text>
            </View>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleBullet}>🛏️</Text>
            <View style={styles.ruleText}>
              <Text style={styles.ruleTitle}>साधक आवास भवन</Text>
              <Text style={styles.ruleDesc}>
                देश-विदेश से आने वाले साधकों के लिए स्वच्छ एवं शांत आवास।
              </Text>
            </View>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleBullet}>🚫</Text>
            <View style={styles.ruleText}>
              <Text style={styles.ruleTitle}>पूर्ण शाकाहार एवं नशा निषेध</Text>
              <Text style={styles.ruleDesc}>
                आश्रम परिसर में धूम्रपान, तंबाकू, शराब एवं मांसाहार पूर्णतया वर्जित है।
              </Text>
            </View>
          </View>
        </View>

        {/* Offline Privacy & Data Backup */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>डेटा सुरक्षा एवं बैकअप (Offline Privacy)</Text>
          <Text style={styles.privacyText}>
            यह ऐप 100% ऑफलाइन कार्य करता है। आपकी साधना का रिकॉर्ड, समय एवं डायरी आपके फोन में ही सुरक्षित रहती है।
          </Text>

          <TouchableOpacity style={styles.backupBtn} onPress={handleExportData}>
            <Text style={styles.backupBtnText}>💾 साधना डेटा बैकअप (Export Local Log)</Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <Text style={styles.versionText}>Jaigurudev Sadhana App • Version 1.0.0 (Offline)</Text>
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
  heroCard: {
    backgroundColor: colors.maroon[900],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(234, 183, 59, 0.3)',
    gap: spacing.xs,
  },
  heroSacred: {
    color: colors.gold[400],
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  heroAddress: {
    color: colors.roseBlush[100],
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  mapBtn: {
    backgroundColor: colors.gold[400],
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  mapBtnText: {
    color: colors.maroon[950],
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    gap: spacing.md,
  },
  cardHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.stone[900],
    borderBottomWidth: 1,
    borderBottomColor: colors.roseBlush[50],
    paddingBottom: spacing.xs,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  phoneIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.roseBlush[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    fontSize: 16,
  },
  contactText: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.stone[800],
  },
  contactNumber: {
    fontSize: 13,
    color: colors.maroon[700],
    fontWeight: '600',
  },
  callBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.white,
    backgroundColor: colors.maroon[700],
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: borderRadius.full,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  ruleBullet: {
    fontSize: 20,
    marginTop: 2,
  },
  ruleText: {
    flex: 1,
  },
  ruleTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.stone[800],
  },
  ruleDesc: {
    fontSize: 11,
    color: colors.stone[500],
    lineHeight: 16,
    marginTop: 2,
  },
  privacyText: {
    fontSize: 11,
    color: colors.stone[600],
    lineHeight: 16,
  },
  backupBtn: {
    backgroundColor: colors.stone[100],
    borderWidth: 1,
    borderColor: colors.stone[300],
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  backupBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.stone[800],
  },
  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.stone[400],
    marginVertical: spacing.sm,
  },
});

export default AshramGuideScreen;
