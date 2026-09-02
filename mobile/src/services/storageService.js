import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SESSIONS: 'jaigurudev_sadhana_sessions',
  DAILY_LOGS: 'jaigurudev_daily_logs',
  SETTINGS: 'jaigurudev_sadhana_settings',
};

export const storageService = {
  // 1. Get All Sadhana Sessions
  async getSessions() {
    try {
      const data = await AsyncStorage.getItem(KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading sessions:', e);
      return [];
    }
  },

  // 2. Save a Meditation Session
  async saveSession(session) {
    try {
      const sessions = await this.getSessions();
      const newSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        dateString: new Date().toISOString().split('T')[0],
        durationMinutes: session.durationMinutes || 30,
        type: session.type || 'Surat Shabd Dhyan',
        notes: session.notes || '',
      };
      sessions.unshift(newSession);
      await AsyncStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
      return newSession;
    } catch (e) {
      console.error('Error saving session:', e);
      throw e;
    }
  },

  // 3. Calculate Sadhana Stats & Streaks
  async getStats() {
    try {
      const sessions = await this.getSessions();
      const todayString = new Date().toISOString().split('T')[0];

      let totalMinutes = 0;
      let todayMinutes = 0;
      const uniqueDays = new Set();

      sessions.forEach((s) => {
        totalMinutes += Number(s.durationMinutes || 0);
        if (s.dateString === todayString) {
          todayMinutes += Number(s.durationMinutes || 0);
        }
        if (s.dateString) {
          uniqueDays.add(s.dateString);
        }
      });

      // Calculate Consecutive Streak
      let streak = 0;
      let checkDate = new Date();

      // Check if meditated today, if not check yesterday
      const todayFormatted = checkDate.toISOString().split('T')[0];
      if (!uniqueDays.has(todayFormatted)) {
        checkDate.setDate(checkDate.getDate() - 1);
      }

      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (uniqueDays.has(dateStr)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }

      return {
        totalMinutes,
        totalHours: (totalMinutes / 60).toFixed(1),
        todayMinutes,
        streakDays: streak,
        totalDays: uniqueDays.size,
        totalSessions: sessions.length,
      };
    } catch (e) {
      console.error('Error calculating stats:', e);
      return { totalMinutes: 0, totalHours: '0.0', todayMinutes: 0, streakDays: 0, totalDays: 0, totalSessions: 0 };
    }
  },

  // 4. Daily Logs (Vegetarianism Pledge, Morning/Evening Checklist)
  async getDailyLog(dateString) {
    try {
      const targetDate = dateString || new Date().toISOString().split('T')[0];
      const data = await AsyncStorage.getItem(`${KEYS.DAILY_LOGS}_${targetDate}`);
      return data
        ? JSON.parse(data)
        : {
            date: targetDate,
            amritVelaCompleted: false,
            sandhyaAartiCompleted: false,
            shakaharPledge: true,
            reflectionJournal: '',
          };
    } catch (e) {
      return null;
    }
  },

  async saveDailyLog(log) {
    try {
      const targetDate = log.date || new Date().toISOString().split('T')[0];
      await AsyncStorage.setItem(`${KEYS.DAILY_LOGS}_${targetDate}`, JSON.stringify(log));
      return log;
    } catch (e) {
      console.error('Error saving daily log:', e);
      throw e;
    }
  },

  // 5. Settings (Alarms, Bell preferences)
  async getSettings() {
    try {
      const data = await AsyncStorage.getItem(KEYS.SETTINGS);
      return data
        ? JSON.parse(data)
        : {
            amritVelaAlarm: '04:00 AM',
            amritVelaEnabled: true,
            sandhyaAlarm: '06:30 PM',
            sandhyaEnabled: true,
            intervalBellMinutes: 15,
            playAmbientDhun: true,
          };
    } catch (e) {
      return {};
    }
  },

  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },
};
