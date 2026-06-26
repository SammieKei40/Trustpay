import "../../global.css";
import { useState } from 'react';
import { FlatList, Modal, Platform, Pressable, Text, TextInput as RNTextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { Button } from '../../../components/ui/Button';
import { ChevronLeft } from '../../../components/ui/ChevronLeft';
import { AppTextInput, SelectInput } from '../../../components/ui/Input';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { Screen } from '../../../components/ui/Screen';
import { useTheme } from '../../../context/ThemeContext';
import { COUNTRIES, DEFAULT_COUNTRY, countryFlag } from '../../../utils/countries';
import type { Country } from '../../../utils/countries';

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

function CalendarIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={4} width={18} height={18} rx={3} stroke={color} strokeWidth={1.8} />
      <Path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={8} cy={15} r={1} fill={color} />
      <Circle cx={12} cy={15} r={1} fill={color} />
      <Circle cx={16} cy={15} r={1} fill={color} />
    </Svg>
  );
}

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [dob, setDob] = useState('');
  const [dobDate, setDobDate] = useState(new Date(1990, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [homeAddress, setHomeAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [genderModal, setGenderModal] = useState(false);
  const [countryModal, setCountryModal] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const placeholderColor = isDark ? '#616161' : '#BDBDBD';

  const handleDateChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (event.type !== 'dismissed' && selected) {
      setDobDate(selected);
      const d = selected.getDate().toString().padStart(2, '0');
      const m = (selected.getMonth() + 1).toString().padStart(2, '0');
      const y = selected.getFullYear();
      setDob(`${d}/${m}/${y}`);
    }
  };

  const filteredCountries = countrySearch.trim()
    ? COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.dialCode.includes(countrySearch)
      )
    : COUNTRIES;

  const canSubmit = fullName.trim().length > 0 && email.trim().length > 0;

  const handleNext = () => {
    router.push('/(auth)/register/id-photo');
  };

  return (
    <Screen scroll>
      <View className="flex-1">

        {/* Back button */}
        <View className="px-4 pt-1 pb-1 items-start">
          <Button
            variant="ghost"
            color="dark"
            size="sm"
            icon={<ChevronLeft />}
            onPress={() => router.back()}
          />
        </View>

        <ProgressBar progress={1 / 8} />

        {/* Title + subtitle */}
        <View className="px-6 pt-2 gap-2">
          <Text className="font-inter-bold text-fg" style={{ fontSize: 26, lineHeight: 36 }}>
            Add your personal info
          </Text>
          <Text className="font-inter-regular text-fg-2" style={{ fontSize: 15, lineHeight: 24 }}>
            This info needs to be accurate with your ID document.
          </Text>
        </View>

        {/* Form */}
        <View className="px-6 pt-5" style={{ gap: 14 }}>

          <AppTextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <AppTextInput
            label="Username"
            placeholder="@username"
            value={username}
            onChangeText={setUsername}
          />

          {/* Gender select */}
          <SelectInput
            label="Gender"
            placeholder="Select gender"
            value={gender || undefined}
            onPress={() => setGenderModal(true)}
          />

          <AppTextInput
            label="Email Address"
            placeholder="abc@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Country select with flag */}
          <SelectInput
            label="Country"
            value={`${countryFlag(country.iso2)}  ${country.name}`}
            onPress={() => setCountryModal(true)}
          />

          {/* Date of Birth */}
          <View>
            <Text className="text-t-12 font-inter-medium text-fg-2 mb-1.5">Date of Birth</Text>
            <Pressable className="bg-input-bg border border-input-border rounded-xl px-4 py-3.5 flex-row items-center" onPress={() => setShowDatePicker(true)}>
              <Text
                className="flex-1 text-t-14 font-inter-regular"
                style={{ color: dob ? (isDark ? '#FFFFFF' : '#0F172A') : placeholderColor }}
              >
                {dob || 'dd/mm/yyyy'}
              </Text>
              <CalendarIcon color={isDark ? '#616161' : '#9E9E9E'} />
            </Pressable>
          </View>

          {/* Android: system dialog renders directly */}
          {Platform.OS === 'android' && showDatePicker && (
            <DateTimePicker
              value={dobDate}
              mode="date"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <AppTextInput
            label="Home Address"
            placeholder="Enter your home address"
            value={homeAddress}
            onChangeText={setHomeAddress}
            autoCapitalize="sentences"
          />

          <AppTextInput
            label="City"
            placeholder="Enter your city"
            value={city}
            onChangeText={setCity}
            autoCapitalize="words"
          />

          <AppTextInput
            label="Zip Code"
            placeholder="Enter zip code"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />

        </View>

        <View className="flex-1 min-h-6" />

        {/* Next button */}
        <View className="px-6 pb-2">
          <Button
            title="Next"
            variant="filled"
            color="primary"
            size="lg"
            fullWidth
            disabled={!canSubmit}
            onPress={handleNext}
          />
        </View>

      </View>

      {/* ── iOS Date picker modal ──────────────────────────────────────── */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={showDatePicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
            onPress={() => setShowDatePicker(false)}
          >
            <Pressable onPress={() => {}}>
              <View className="bg-white dark:bg-dark rounded-t-3xl pt-3 pb-8">
                <View className="items-center mb-3">
                  <View className="w-10 h-1 rounded-full bg-black-30 dark:bg-black-80" />
                </View>
                <View className="flex-row items-center justify-between px-5 mb-2">
                  <Pressable onPress={() => setShowDatePicker(false)} hitSlop={12}>
                    <Text className="text-t-16 text-black-50 font-inter-regular">Cancel</Text>
                  </Pressable>
                  <Text className="text-t-18 font-inter-semibold text-dark dark:text-white">Date of Birth</Text>
                  <Pressable onPress={() => setShowDatePicker(false)} hitSlop={12}>
                    <Text className="text-t-16 text-primary font-inter-semibold">Done</Text>
                  </Pressable>
                </View>
                <DateTimePicker
                  value={dobDate}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  style={{ height: 200 }}
                />
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      )}

      {/* ── Gender picker modal ─────────────────────────────────────────── */}
      <Modal visible={genderModal} animationType="slide" transparent onRequestClose={() => setGenderModal(false)}>
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          onPress={() => setGenderModal(false)}
        >
          <Pressable
            onPress={() => {}}
            className="bg-white dark:bg-dark rounded-t-3xl pt-3 pb-8"
          >
            <View className="items-center mb-4">
              <View className="w-10 h-1 rounded-full bg-black-30 dark:bg-black-80" />
            </View>
            <View className="flex-row items-center justify-between px-5 mb-4">
              <Text className="text-t-18 font-inter-semibold text-dark dark:text-white">Select Gender</Text>
              <Pressable onPress={() => setGenderModal(false)} hitSlop={12}>
                <Text className="text-t-16 text-black-50 dark:text-black-60">✕</Text>
              </Pressable>
            </View>
            {GENDER_OPTIONS.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => { setGender(opt); setGenderModal(false); }}
                className={`flex-row items-center px-5 py-4 active:bg-black-5 dark:active:bg-dark-card ${
                  gender === opt ? 'bg-black-5 dark:bg-dark-card' : ''
                }`}
              >
                <Text className={`flex-1 text-t-16 ${gender === opt ? 'font-inter-semibold text-primary' : 'font-inter-regular text-dark dark:text-white'}`}>
                  {opt}
                </Text>
                {gender === opt && <Text className="text-t-16 text-primary">✓</Text>}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Country picker modal ────────────────────────────────────────── */}
      <Modal visible={countryModal} animationType="slide" transparent onRequestClose={() => { setCountryModal(false); setCountrySearch(''); }}>
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          onPress={() => { setCountryModal(false); setCountrySearch(''); }}
        >
          <Pressable
            onPress={() => {}}
            className="bg-white dark:bg-dark rounded-t-3xl pt-3"
            style={{ height: '75%' }}
          >
            <View className="items-center mb-4">
              <View className="w-10 h-1 rounded-full bg-black-30 dark:bg-black-80" />
            </View>
            <View className="flex-row items-center justify-between px-5 mb-4">
              <Text className="text-t-18 font-inter-semibold text-dark dark:text-white">Select Country</Text>
              <Pressable onPress={() => { setCountryModal(false); setCountrySearch(''); }} hitSlop={12}>
                <Text className="text-t-16 text-black-50 dark:text-black-60">✕</Text>
              </Pressable>
            </View>
            <View className="mx-5 mb-3 bg-black-10 dark:bg-dark-card rounded-xl px-3.5 py-2.5 flex-row items-center gap-2">
              <Text className="text-t-16 text-black-50">🔍</Text>
              <RNTextInput
                className="flex-1 text-t-14 font-inter-regular text-dark dark:text-white"
                placeholder="Search country..."
                placeholderTextColor={isDark ? '#616161' : '#9E9E9E'}
                value={countrySearch}
                onChangeText={setCountrySearch}
                autoCapitalize="none"
              />
              {countrySearch.length > 0 && (
                <Pressable onPress={() => setCountrySearch('')} hitSlop={8}>
                  <Text className="text-t-14 text-black-50">✕</Text>
                </Pressable>
              )}
            </View>
            <View className="h-px bg-black-20 dark:bg-black-80 mb-1" />
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.iso2}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = item.iso2 === country.iso2;
                return (
                  <Pressable
                    onPress={() => { setCountry(item); setCountryModal(false); setCountrySearch(''); }}
                    className={`flex-row items-center px-5 py-3.5 gap-3.5 active:bg-black-5 dark:active:bg-dark-card ${isSelected ? 'bg-black-5 dark:bg-dark-card' : ''}`}
                  >
                    <Text style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{countryFlag(item.iso2)}</Text>
                    <Text className={`flex-1 text-t-14 ${isSelected ? 'font-inter-semibold text-primary' : 'font-inter-regular text-dark dark:text-white'}`}>
                      {item.name}
                    </Text>
                    {isSelected && <Text className="text-t-16 text-primary">✓</Text>}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>

    </Screen>
  );
}
