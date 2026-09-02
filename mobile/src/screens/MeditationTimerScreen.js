import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Vibration,
  ScrollView,
} from 'react-native';
import { colors, spacing, borderRadius } from '../theme';
import { storageService } from '../services/storageService';

export const MeditationTimerScreen = ({ navigation }) => {
  const [selectedDuration, setSelectedDuration] = useState(30); // in minutes
  const [practiceType, setPracticeType] = useState('Surat Shabd Dhyan');
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalChime, setIntervalChime] = useState(true);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [reflectionNotes, setReflectionNotes] = useState('');

  const timerRef = useRef(null);

  const durations = [
    { label: '15 Min', value: 15 },
    { label: '30 Min', value: 30 },
    { label: '45 Min', value: 45 },
    { label: '1 Hour', value: 60 },
    { label: '2 Hours', value: 120 },
    { label: '3 Hours', value: 180 },
  ];

  const practiceTypes = [
    'Surat Shabd Dhyan',
    'Naam Simran (सिमरन)',
    'Bhajan (भजन)',
  ];

  useEffect(() => {
    if (!isRunning) {
      setSecondsRemaining(selectedDuration * 60);
    }
  }, [selectedDuration]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishMeditation();
            return 0;
          }

          // Trigger subtle vibration on 15-min intervals
          if (intervalChime && (prev - 1) % 900 === 0 && prev > 900) {
            Vibration.vibrate([0, 500, 200, 500]);
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, isPaused, intervalChime]);

  const startMeditation = () => {
    setIsRunning(true);
    setIsPaused(false);
    Vibration.vibrate(300);
  };

  const pauseMeditation = () => {
    setIsPaused(true);
  };

  const resumeMeditation = () => {
    setIsPaused(false);
  };

  const resetMeditation = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setSecondsRemaining(selectedDuration * 60);
  };

  const finishMeditation = async () => {
    setIsRunning(false);
    setIsPaused(false);
    Vibration.vibrate([0, 1000, 500, 1000]);
    setShowCompleteModal(true);
  };

  const saveCompletedSession = async () => {
    try {
      await storageService.saveSession({
        durationMinutes: selectedDuration,
        type: practiceType,
        notes: reflectionNotes,
      });
      setShowCompleteModal(false);
      setReflectionNotes('');
      setSecondsRemaining(selectedDuration * 60);
      if (navigation?.navigate) {
        navigation.navigate('Home');
      }
    } catch (e) {
      alert('Error saving session');
    }
  };

  // Format time display (HH:MM:SS or MM:SS)
  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const remainingSeconds = secs % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const progressPercent = Math.min(
    100,
    Math.max(0, ((selectedDuration * 60 - secondsRemaining) / (selectedDuration * 60)) * 100)
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.sacredHeading}>॥ नाम-ध्यान साधना ॥</Text>
          <Text style={styles.subHeading}>Surat-Shabd Yoga Meditation Timer</Text>
        </View>

        {/* Practice Type Selector (When not running) */}
        {!isRunning && (
          <View style={styles.selectorContainer}>
            <Text style={styles.label}>साधना पद्धति (Practice Mode):</Text>
            <View style={styles.typeRow}>
              {practiceTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeChip,
                    practiceType === type && styles.typeChipActive,
                  ]}
                  onPress={() => setPracticeType(type)}
                >
                  <Text
                    style={[
                      styles.typeChipText,
                      practiceType === type && styles.typeChipTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Sacred Circular Meditation Timer Visual */}
        <View style={styles.timerCircleOuter}>
          <View style={styles.timerCircleInner}>
            <Text style={styles.mantraSmall}>जयगुरुदेव</Text>
            <Text style={styles.timeDisplay}>{formatTime(secondsRemaining)}</Text>
            <Text style={styles.statusText}>
              {isRunning
                ? isPaused
                  ? 'रुका हुआ (Paused)'
                  : 'साधना जारी है (Meditation in Progress)'
                : 'प्रारंभ करने हेतु तैयार (Ready)'}
            </Text>
            {isRunning && (
              <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
              </View>
            )}
          </View>
        </View>

        {/* Duration Selectors (When not running) */}
        {!isRunning ? (
          <View style={styles.selectorContainer}>
            <Text style={styles.label}>अवधि चुनें (Select Duration):</Text>
            <View style={styles.durationGrid}>
              {durations.map((d) => (
                <TouchableOpacity
                  key={d.value}
                  style={[
                    styles.durationChip,
                    selectedDuration === d.value && styles.durationChipActive,
                  ]}
                  onPress={() => setSelectedDuration(d.value)}
                >
                  <Text
                    style={[
                      styles.durationText,
                      selectedDuration === d.value && styles.durationTextActive,
                    ]}
                  >
                    {d.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Interval Chime toggle */}
            <TouchableOpacity
              style={styles.chimeToggle}
              onPress={() => setIntervalChime(!intervalChime)}
            >
              <View style={[styles.checkbox, intervalChime && styles.checkboxActive]}>
                {intervalChime && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.chimeText}>
                प्रत्येक 15 मिनट पर सूक्ष्म घंटी (15-Min Interval Chime)
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Action Controls */}
        <View style={styles.controlsRow}>
          {!isRunning ? (
            <TouchableOpacity style={styles.primaryBtn} onPress={startMeditation}>
              <Text style={styles.primaryBtnText}>▶ साधना प्रारंभ करें (Begin)</Text>
            </TouchableOpacity>
          ) : (
            <>
              {isPaused ? (
                <TouchableOpacity style={styles.primaryBtn} onPress={resumeMeditation}>
                  <Text style={styles.primaryBtnText}>▶ जारी रखें (Resume)</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.pauseBtn} onPress={pauseMeditation}>
                  <Text style={styles.pauseBtnText}>⏸ विराम (Pause)</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.resetBtn} onPress={resetMeditation}>
                <Text style={styles.resetBtnText}>⏹ समाप्त (End)</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Completion Modal */}
      <Modal
        visible={showCompleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCompleteModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🌸</Text>
            <Text style={styles.modalSacred}>॥ पावन साधना संपन्न ॥</Text>
            <Text style={styles.modalTitle}>जयगुरुदेव! आपकी साधना पूर्ण हुई</Text>
            <Text style={styles.modalDuration}>
              कुल समय: {selectedDuration} मिनट ({practiceType})
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="आज की साधना का अनुभव / डायरी नोट्स (Optional)..."
              placeholderTextColor={colors.stone[400]}
              multiline
              numberOfLines={3}
              value={reflectionNotes}
              onChangeText={setReflectionNotes}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={saveCompletedSession}>
              <Text style={styles.saveBtnText}>डायरी में सुरक्षित करें (Save Session)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
    gap: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.sm,
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
  selectorContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    gap: spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.stone[700],
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  typeChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: borderRadius.md,
    backgroundColor: colors.stone[100],
  },
  typeChipActive: {
    backgroundColor: colors.maroon[700],
  },
  typeChipText: {
    fontSize: 11,
    color: colors.stone[700],
    fontWeight: '600',
  },
  typeChipTextActive: {
    color: colors.white,
  },
  timerCircleOuter: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.maroon[900],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.gold[400],
    shadowColor: colors.maroon[950],
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginVertical: spacing.md,
  },
  timerCircleInner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  mantraSmall: {
    color: colors.gold[300],
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  timeDisplay: {
    color: colors.white,
    fontSize: 42,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  statusText: {
    color: colors.roseBlush[100],
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  progressTrack: {
    width: 140,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.gold[400],
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  durationChip: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    backgroundColor: colors.roseBlush[50],
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    alignItems: 'center',
  },
  durationChipActive: {
    backgroundColor: colors.maroon[700],
    borderColor: colors.maroon[700],
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.stone[700],
  },
  durationTextActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
  chimeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  chimeText: {
    fontSize: 11,
    color: colors.stone[600],
    flex: 1,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
    justifyContent: 'center',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: colors.maroon[700],
    paddingVertical: 14,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    shadowColor: colors.maroon[800],
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  pauseBtn: {
    flex: 1,
    backgroundColor: colors.gold[500],
    paddingVertical: 14,
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  pauseBtnText: {
    color: colors.maroon[950],
    fontSize: 14,
    fontWeight: 'bold',
  },
  resetBtn: {
    backgroundColor: colors.stone[200],
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  resetBtnText: {
    color: colors.stone[700],
    fontSize: 13,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalEmoji: {
    fontSize: 32,
  },
  modalSacred: {
    color: colors.gold[700],
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  modalTitle: {
    color: colors.stone[900],
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalDuration: {
    color: colors.stone[500],
    fontSize: 12,
  },
  modalInput: {
    width: '100%',
    backgroundColor: colors.stone[50],
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 12,
    color: colors.stone[800],
    textAlignVertical: 'top',
    marginVertical: spacing.sm,
  },
  saveBtn: {
    width: '100%',
    backgroundColor: colors.maroon[700],
    paddingVertical: 12,
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  saveBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default MeditationTimerScreen;
