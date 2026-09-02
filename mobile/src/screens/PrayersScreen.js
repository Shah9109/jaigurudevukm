import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

export const PrayersScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('aarti');
  const [fontSize, setFontSize] = useState(15);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const prayers = {
    morning: {
      title: 'प्रातः कालीन पावन प्रार्थना एवं वंदना',
      subtitle: 'अमृत वेला प्रार्थना',
      text: `॥ प्रातः वंदना ॥

गुरु चरणन पर ध्यान लगाऊँ,
भव-सागर से पार लगाऊँ।
दया दृष्टि अपनी बरसाना,
अज्ञान तिमिर सब दूर भगाना॥

काम क्रोध मद लोभ मिटाओ,
सत्य शब्द की धुन सुनाओ।
सुरत शब्द का मेल कराके,
निज धाम का पंथ दिखाओ॥

हे दयाल सतगुरु सुखदाई,
हम अज्ञानी शरण तुम्हारी आई।
जय जय जय सतगुरु सुखधाम,
कोटि-कोटि तुमको परनाम॥`,
    },
    aarti: {
      title: 'जयगुरुदेव जी की पावन आरती',
      subtitle: 'सायंकालीन आरती',
      text: `॥ पावन आरती ॥

जय सतगुरु जय जय जगदीशा,
चरण कमल में नवाऊँ शीशा॥

तुम दाता तुम दीन दयाला,
काटो सकल करम का जाला।
भव सागर में नैया डोले,
नाम का खेवैया पार लगावे॥

सुरत जोड़े शब्द के पावन धुन से,
मुक्ति पावे काल के बंधन से।
दीप जलाऊँ प्रेम का मन में,
गुरु छवि बसे नयन में॥

आरती गावे जो नर नारी,
पावे परम पद सुख भारी।
जय सतगुरु दीन दयाला,
जयगुरुदेव परम सुखदाता॥`,
    },
    dhun: {
      title: 'अखंड नाम-धुन महामंत्र',
      subtitle: 'महामंत्र ध्यान',
      text: `॥ अखंड नाम-धुन ॥

जय गुरुदेव, जय गुरुदेव,
जय जय गुरुदेव, जय गुरुदेव॥

नाम जपो मन निर्मल होई,
भव बंधन सब कट जाई कोई।
जीव दया का पालन कीजे,
शाकाहार अपना कर लीजे॥

जय गुरुदेव, जय गुरुदेव,
जय जय गुरुदेव, जय गुरुदेव॥`,
    },
    sakhi: {
      title: 'संत मत अनमोल साखियां',
      subtitle: 'आत्म-ज्ञान दोहे',
      text: `॥ संत वाणी साखियां ॥

गुरु गोविन्द दोऊ खड़े, काके लागूं पाँय।
बलिहारी गुरु आपने, गोविन्द दियो बताय॥

माटी का यह चोला है, एक दिन माटी होय।
नाम सिमर ले हे मना, मुक्ति पावे सोय॥

पानी का बबूला है यह तन, छिन में बिनस जाय।
सतगुरु की सेवा बिना, जीवन व्यर्थ गँवाय॥

दया धर्म का मूल है, पाप मूल अभिमान।
तुलसी दया न छोड़िये, जब लग घट में प्रान॥`,
    },
  };

  const currentPrayer = prayers[selectedCategory] || prayers.aarti;

  return (
    <SafeAreaView style={styles.container}>
      {/* Category Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, selectedCategory === 'morning' && styles.tabBtnActive]}
          onPress={() => setSelectedCategory('morning')}
        >
          <Text style={[styles.tabBtnText, selectedCategory === 'morning' && styles.tabBtnTextActive]}>
            प्रातः प्रार्थना
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, selectedCategory === 'aarti' && styles.tabBtnActive]}
          onPress={() => setSelectedCategory('aarti')}
        >
          <Text style={[styles.tabBtnText, selectedCategory === 'aarti' && styles.tabBtnTextActive]}>
            पावन आरती
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, selectedCategory === 'dhun' && styles.tabBtnActive]}
          onPress={() => setSelectedCategory('dhun')}
        >
          <Text style={[styles.tabBtnText, selectedCategory === 'dhun' && styles.tabBtnTextActive]}>
            नाम-धुन
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, selectedCategory === 'sakhi' && styles.tabBtnActive]}
          onPress={() => setSelectedCategory('sakhi')}
        >
          <Text style={[styles.tabBtnText, selectedCategory === 'sakhi' && styles.tabBtnTextActive]}>
            साखियां
          </Text>
        </TouchableOpacity>
      </View>

      {/* Prayer Reader Body */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.prayerTitle}>{currentPrayer.title}</Text>
              <Text style={styles.prayerSubtitle}>{currentPrayer.subtitle}</Text>
            </View>

            {/* Font Zoom Controls */}
            <View style={styles.zoomControls}>
              <TouchableOpacity
                style={styles.zoomBtn}
                onPress={() => setFontSize(Math.max(12, fontSize - 2))}
              >
                <Text style={styles.zoomBtnText}>A-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.zoomBtn}
                onPress={() => setFontSize(Math.min(24, fontSize + 2))}
              >
                <Text style={styles.zoomBtnText}>A+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Audio Chanting Bar */}
          <TouchableOpacity
            style={[styles.audioBar, isPlayingAudio && styles.audioBarPlaying]}
            onPress={() => setIsPlayingAudio(!isPlayingAudio)}
          >
            <Text style={styles.audioIcon}>{isPlayingAudio ? '⏸' : '▶'}</Text>
            <Text style={styles.audioText}>
              {isPlayingAudio ? 'ध्वनि बज रही है (Playing Audio Chime)' : 'ऑडियो पाठ सुनें (Listen Offline Audio)'}
            </Text>
          </TouchableOpacity>

          {/* Prayer Lines Text */}
          <Text style={[styles.prayerBody, { fontSize, lineHeight: fontSize * 1.8 }]}>
            {currentPrayer.text}
          </Text>
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
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.maroon[900],
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    gap: spacing.xs,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  tabBtnActive: {
    backgroundColor: colors.gold[400],
  },
  tabBtnText: {
    color: colors.roseBlush[100],
    fontSize: 11,
    fontWeight: 'bold',
  },
  tabBtnTextActive: {
    color: colors.maroon[950],
  },
  scrollContent: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    gap: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.roseBlush[50],
    paddingBottom: spacing.sm,
  },
  prayerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.maroon[900],
  },
  prayerSubtitle: {
    fontSize: 11,
    color: colors.gold[700],
    fontWeight: '600',
    marginTop: 2,
  },
  zoomControls: {
    flexDirection: 'row',
    gap: 4,
  },
  zoomBtn: {
    backgroundColor: colors.stone[100],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  zoomBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.stone[700],
  },
  audioBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.roseBlush[50],
    borderWidth: 1,
    borderColor: colors.roseBlush[100],
    borderRadius: borderRadius.full,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: spacing.sm,
  },
  audioBarPlaying: {
    backgroundColor: colors.maroon[100],
    borderColor: colors.maroon[300],
  },
  audioIcon: {
    fontSize: 14,
    color: colors.maroon[800],
  },
  audioText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.maroon[800],
  },
  prayerBody: {
    color: colors.stone[800],
    fontFamily: 'sans-serif',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});

export default PrayersScreen;
