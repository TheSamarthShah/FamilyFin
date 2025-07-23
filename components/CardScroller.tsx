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
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type FieldType = 'text' | 'number' | 'email' | 'password' | 'date';

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
};

type CardScrollerProps = {
  label?: string;
  initialCards?: Record<string, any>[];
  fields: Field[];
  onChange?: (cards: Record<string, any>[]) => void;
  maxCards?: number;
};

const CardScroller = ({
  label,
  initialCards = [],
  fields,
  onChange,
  maxCards = 10,
}: CardScrollerProps) => {
  const CARD_WIDTH = Dimensions.get('window').width * 0.85;
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState<Record<string, any>[]>(initialCards);
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
// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
  const createNewCard = () => {
    const newCard: Record<string, any> = {};
    fields.forEach(field => {
      newCard[field.key] = field.type === 'number' ? 0 : '';
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

    // Configure animation
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

  // Dynamic styles based on theme
  const dynamicStyles = StyleSheet.create({
    wrapper: {
      marginBottom: moderateVerticalScale(24),
      paddingHorizontal: moderateScale(16),
    },
    heading: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: colorScheme.textPrimary,
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
  });

  return (
     <View style={dynamicStyles.wrapper}>
      <View style={styles.header}>
        {label && <Text style={dynamicStyles.heading}>{label}</Text>}
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
      </View>

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
                  <TextInput
                    style={dynamicStyles.input}
                    keyboardType={
                      field.type === 'number'
                        ? 'numeric'
                        : field.type === 'email'
                        ? 'email-address'
                        : 'default'
                    }
                    secureTextEntry={field.type === 'password'}
                    value={card[field.key]?.toString() || ''}
                    onChangeText={(text) => {
                      const value = field.type === 'number' ? 
                        (text ? Number(text) : 0) : text;
                      handleCardChange(index, field.key, value);
                    }}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    placeholderTextColor={colorScheme.textMuted}
                  />
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
        
          <TouchableOpacity 
            style={[dynamicStyles.addButton, !(canAddMore) && styles.disabledButton]} 
            onPress={handleAddCard}
            disabled = {!(canAddMore)}
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
    </View>
  );
};

// Static styles that don't depend on theme
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default CardScroller;