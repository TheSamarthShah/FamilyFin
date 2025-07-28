import { Colors } from '@/colors';
import { useThemeContext } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import DatePicker from './DatePicker';
import Dropdown, { Option } from './Dropdown';

type FieldType = 'text' | 'number' | 'date' | 'select' | 'radio';

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: Option[]; // Using the Option type from your Dropdown
};

type CardScrollerProps = {
  label?: string;
  initialCards?: Record<string, any>[];
  fields: Field[];
  onChange?: (cards: Record<string, any>[]) => void;
  onSave?: (cards: Record<string, any>[]) => void;
  maxCards?: number;
  collapsible?: boolean;
  initiallyCollapsed?: boolean;
  dateFormat?: (date: Date) => string;
};

const CardScroller = ({
  label,
  initialCards = [],
  fields,
  onChange,
  onSave,
  maxCards = 10,
  collapsible = false,
  initiallyCollapsed = false,
  dateFormat = (date) => date.toLocaleDateString(),
}: CardScrollerProps) => {
  const CARD_WIDTH = Dimensions.get('window').width * 0.85;
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState<Record<string, any>[]>(initialCards);
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed);
  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);
  const canAddMore = cards.length < maxCards;
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { theme } = useThemeContext();
  const colorScheme = Colors[theme];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const createNewCard = () => {
  const newCard: Record<string, any> = {};
  fields.forEach(field => {
    // Set today's date as default for date fields, empty string for text, and 0 for numbers
    newCard[field.key] = field.type === 'number' ? 0 : 
                        field.type === 'date' ? new Date() : '';
  });
  return newCard;
};

  const handleAddCard = () => {
    if (!canAddMore) return;
    const newCard = createNewCard();
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    onChange?.(updatedCards);
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
      setCurrentIndex(updatedCards.length - 1);
    }, 100);
  };

  const handleRemoveCard = (index: number) => {
    if (cards.length <= 1) return;

    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });

    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    onChange?.(updatedCards);
    
    const newIndex = Math.min(currentIndex, updatedCards.length - 1);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const handleCardChange = (index: number, key: string, value: any) => {
    const updatedCards = [...cards];
    updatedCards[index][key] = value;
    setCards(updatedCards);
    onChange?.(updatedCards);
  };

  const handleDateChange = (index: number, key: string, event: any, selectedDate?: Date) => {
    setShowDatePicker(null);
    if (selectedDate) {
      handleCardChange(index, key, selectedDate);
    }
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= cards.length) return;
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * (CARD_WIDTH + moderateScale(16)),
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / (CARD_WIDTH + moderateScale(16)));
    if (newIndex !== currentIndex) setCurrentIndex(newIndex);
  };

  const toggleCollapse = () => {
    if (!collapsible) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  };

  const handleSave = () => {
    onSave?.(cards);
  };

  const renderFieldInput = (field: Field, value: any, index: number, key: string) => {
  switch (field.type) {
       case 'date':
  return (
    <DatePicker
      value={value ? new Date(value) : null}
      onChange={(date) => handleCardChange(index, key, date)}
      placeholder={`Select ${field.label.toLowerCase()}`}
      style={dynamicStyles.dateInput}
      textStyle={dynamicStyles.dateText}
      dateFormat={dateFormat}
    />
  );
    
    case 'select':
      return (
        <Dropdown
          options={field.options || []}
          value={value}
          onChange={(selectedItem) => handleCardChange(index, key, selectedItem.value)}
          placeholder={`Select ${field.label}`}
          style={dynamicStyles.selectInput}
          textStyle={{ color: colorScheme.textPrimary }}
        />
      );
    
    case 'radio':
      return (
        <View>
          {(field.options || []).map((option) => (
            <View key={option.value} style={dynamicStyles.radioContainer}>
              <RadioButton
                value={option.value}
                status={value === option.value ? 'checked' : 'unchecked'}
                onPress={() => handleCardChange(index, key, option.value)}
                color={colorScheme.textAccent}
              />
              <Text style={dynamicStyles.radioLabel}>{option.label}</Text>
            </View>
          ))}
        </View>
      );
    
    default:
      return (
        <TextInput
          style={dynamicStyles.input}
          keyboardType={field.type === 'number' ? 'numeric' : 'default'}
          value={value?.toString() || ''}
          onChangeText={(text) => {
            const val = field.type === 'number' ? (text ? Number(text) : 0) : text;
            handleCardChange(index, key, val);
          }}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          placeholderTextColor={colorScheme.textMuted}
        />
      );
  }
};

  const dynamicStyles = StyleSheet.create({
    wrapper: {
      marginBottom: moderateVerticalScale(24),
      paddingHorizontal: moderateScale(16),
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    heading: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: colorScheme.textPrimary,
    },
    collapseButton: {
      padding: moderateScale(8),
    },
    card: {
      backgroundColor: colorScheme.bgSurface,
      borderRadius: moderateScale(12),
      padding: moderateScale(20),
      marginRight: moderateScale(16),
      borderWidth: 1,
      borderColor: colorScheme.bgLevel2,
      shadowColor: colorScheme.textPrimary,
      shadowOpacity: theme === 'light' ? 0.1 : 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    label: {
      fontSize: moderateScale(14),
      fontWeight: '500',
      color: colorScheme.textPrimary,
      marginBottom: moderateVerticalScale(6),
    },
    input: {
      backgroundColor: colorScheme.bgSurfaceVariant,
      borderWidth: 1,
      borderColor: colorScheme.bgLevel2,
      borderRadius: moderateScale(8),
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateVerticalScale(10),
      fontSize: moderateScale(15),
      color: colorScheme.textPrimary,
    },
     dateInput: {
    backgroundColor: colorScheme.bgSurfaceVariant,
    borderWidth: 1,
    borderColor: colorScheme.bgLevel2,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateVerticalScale(10),
    justifyContent: 'center',
  },
  dateText: {
    fontSize: moderateScale(15),
    color: colorScheme.textPrimary,
  },
  quickActions: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginTop: moderateVerticalScale(8),
  gap: moderateScale(8),
},
quickActionButton: {
  paddingHorizontal: moderateScale(12),
  paddingVertical: moderateVerticalScale(6),
  backgroundColor: colorScheme.bgLevel2,
  borderRadius: moderateScale(20),
},
quickActionText: {
  color: colorScheme.textPrimary,
  fontSize: moderateScale(12),
},
    selectInput: {
      backgroundColor: colorScheme.bgSurfaceVariant,
      borderWidth: 1,
      borderColor: colorScheme.bgLevel2,
      borderRadius: moderateScale(8),
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateVerticalScale(10),
      fontSize: moderateScale(15),
      color: colorScheme.textPrimary,
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: moderateVerticalScale(4),
    },
    radioLabel: {
      fontSize: moderateScale(14),
      color: colorScheme.textPrimary,
      marginLeft: moderateScale(8),
    },
    addButton: {
      backgroundColor: colorScheme.textAccent,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(16),
      paddingVertical: moderateVerticalScale(10),
      borderRadius: moderateScale(20),
    },
    navButton: {
      backgroundColor: colorScheme.textAccent,
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: colorScheme.textDanger,
      position: 'absolute',
      top: moderateScale(5),
      right: moderateScale(5),
      width: moderateScale(24),
      height: moderateScale(24),
      borderRadius: moderateScale(12),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      shadowColor: colorScheme.textPrimary,
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
    collapsedContent: {
      paddingTop: moderateVerticalScale(8),
    },
    saveButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: moderateScale(8),
    },
    saveButton: {
      backgroundColor: colorScheme.bgSurfaceVariant,
      borderWidth: 1,
      borderColor: colorScheme.bgLevel3,
      paddingHorizontal: moderateScale(12),
      paddingVertical: moderateVerticalScale(6),
      borderRadius: moderateScale(20),
      flexDirection: 'row',
      alignItems: 'center',
    },
    saveButtonText: {
      fontSize: moderateScale(14),
      fontWeight: '500',
      marginLeft: moderateScale(6),
      color: colorScheme.textPrimary,
    },
    saveIcon: {
      color: colorScheme.textSuccess,
    },
    headerControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={dynamicStyles.wrapper}>
      <View style={dynamicStyles.headerContainer}>
        {label && (
          <TouchableOpacity
            onPress={toggleCollapse}
            activeOpacity={collapsible ? 0.6 : 1}
            style={{ flex: 1 }}
          >
            <Text style={dynamicStyles.heading}>{label}</Text>
          </TouchableOpacity>
        )}

        <View style={dynamicStyles.headerControls}>
          {!isCollapsed && (
            <>
              <View style={styles.pagination}>
                {cards.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      {
                        backgroundColor: index === currentIndex ?
                          colorScheme.textAccent : colorScheme.textNeutral
                      }
                    ]}
                  />
                ))}
              </View>
            </>
          )}

          {collapsible && (
            <TouchableOpacity
              onPress={toggleCollapse}
              style={dynamicStyles.collapseButton}
            >
              <Ionicons
                name={isCollapsed ? 'chevron-down' : 'chevron-up'}
                size={24}
                color={colorScheme.textPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!isCollapsed && (
        <>
          <View style={styles.carouselContainer}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              onMomentumScrollEnd={handleScroll}
              snapToInterval={CARD_WIDTH + moderateScale(16)}
              decelerationRate="fast"
            >
              {cards.map((card, index) => (
                <View
                  key={`card-${index}`}
                  style={[dynamicStyles.card, { width: CARD_WIDTH }]}
                >
                  {cards.length > 1 && (
                    <TouchableOpacity
                      style={dynamicStyles.deleteButton}
                      onPress={() => handleRemoveCard(index)}
                    >
                      <Ionicons name="close" size={16} color={colorScheme.textOnPrimary} />
                    </TouchableOpacity>
                  )}

                  {fields.map((field) => (
                    <View key={`${index}-${field.key}`} style={styles.inputGroup}>
                      <Text style={dynamicStyles.label}>
                        {field.label}
                        {field.required && <Text style={{ color: colorScheme.textDanger }}> *</Text>}
                      </Text>
                      {renderFieldInput(field, card[field.key], index, field.key)}
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                dynamicStyles.navButton,
                !(cards.length > 0 && currentIndex > 0) && styles.disabledButton
              ]}
              onPress={() => scrollToIndex(currentIndex - 1)}
              disabled={!(cards.length > 0 && currentIndex > 0)}
            >
              <Ionicons name="chevron-back" size={20} color={colorScheme.textOnPrimary} />
            </TouchableOpacity>

            {onSave && (
              <TouchableOpacity
                style={dynamicStyles.saveButton}
                onPress={handleSave}
              >
                <Ionicons
                  name="save-outline"
                  size={16}
                  style={dynamicStyles.saveIcon}
                />
                <Text style={dynamicStyles.saveButtonText}>
                  Save
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[dynamicStyles.addButton, !canAddMore && styles.disabledButton]}
              onPress={handleAddCard}
              disabled={!canAddMore}
            >
              <Ionicons name="add" size={20} color={colorScheme.textOnPrimary} />
              <Text style={[styles.addButtonText, { color: colorScheme.textOnPrimary }]}>
                Add Card
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                dynamicStyles.navButton,
                !(cards.length > 0 && currentIndex < cards.length - 1) && styles.disabledButton
              ]}
              onPress={() => scrollToIndex(currentIndex + 1)}
              disabled={!(cards.length > 0 && currentIndex < cards.length - 1)}
            >
              <Ionicons name="chevron-forward" size={20} color={colorScheme.textOnPrimary} />
            </TouchableOpacity>
          </View>
        </>
      )}

      {isCollapsed && (
        <View style={dynamicStyles.collapsedContent}>
          <Text style={{ color: colorScheme.textMuted }}>
            {cards.length} card{cards.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(16),
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    marginHorizontal: moderateScale(3),
  },
  carouselContainer: {
    marginBottom: moderateVerticalScale(16),
  },
  scrollContent: {
    paddingVertical: moderateVerticalScale(8),
  },
  inputGroup: {
    marginBottom: moderateVerticalScale(16),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
  },
  disabledButton: {
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginLeft: moderateScale(8),
  },
  saveButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginLeft: moderateScale(6),
  },
});

export default CardScroller;