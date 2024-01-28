import { useRouter } from "expo-router";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import SafeAreaLayout from "../context/SafeAreaLayout";

import { ButtonText } from "../components/elements/Button";
import TransitionElement from "../components/transitions/TransitionElement";

import { colorOrange, colorPurple, colorWhite, secondaryTextLight, stylesBase } from "../utils/styles";

const windowWidth = Dimensions.get("window").width;

type Slide = {
  id: number;
  JSX: JSX.Element;
};

export default function Index() {

  const router = useRouter();

  const slides: Slide[] = useMemo(() => [
    { id: 0, JSX: <SlideOne /> },
    { id: 1, JSX: <SlideTwo /> },
    { id: 2, JSX: <SlideThree /> },
  ], []);

  const [idCurrentSlide, setIdCurrentSlide] = useState<number>(slides[0].id);
  const [hasReachedLastSlide, setHasReachedLastSlide] = useState(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      let slide = Math.ceil(event.nativeEvent.contentOffset.x / windowWidth);
      slide = Math.max(0, Math.min(slide, slides.length - 1));
      if (slide !== idCurrentSlide) {
        setIdCurrentSlide(slide);
      }
    },
    [idCurrentSlide],
  );

  useEffect(() => {
    if (idCurrentSlide === slides.length - 1) {
      setHasReachedLastSlide(true);
    }
  }, [idCurrentSlide]);

  const handleNavigateToRegister = useCallback(() => {
    router.push("/auth/home");
  }, []);

  return (
    <View style={styles.wrapper}>
      <SafeAreaLayout>
        <View style={styles.container}>
          <View style={styles.scrollView}>
            <FlatList
              data={slides}
              horizontal
              pagingEnabled
              onScroll={handleScroll}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View key={item.id} style={styles.slideWidth}>
                  {item.JSX}
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <View style={styles.dots}>
            {slides.map((slide, index) => (
              <View
                key={slide.id}
                style={[
                  styles.dot,
                  idCurrentSlide === index
                    ? styles.dotActive
                    : styles.dotInactive,
                ]}
              />
            ))}
          </View>
          <View style={styles.actionContainer}>
            {hasReachedLastSlide && (
              <TransitionElement>
                <ButtonText
                  text="Avanti"
                  styleText={styles.action}
                  onPress={handleNavigateToRegister}
                />
              </TransitionElement>
            )}
          </View>
        </View>
      </SafeAreaLayout>
    </View>
  );
}

function SlideOne() {
  const bodyCopy =
    "L'app che ti darà la possibilità\ndi fare shopping online e\nricevere i tuoi ordini entro\n60 minuti ovunque tu voglia!";
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>Benvenuto</Text>
      <Text style={styles.title}>su Wink</Text>
      <Text style={styles.body}>{bodyCopy}</Text>
    </View>
  );
}

function SlideTwo() {
  const bodyCopy =
    "Accedi o registrati, dopodiché\navrai a disposizione gli articoli\ndei negozi affiliati, in una\npiattaforma a portata di mano!";
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>Acquista con</Text>
      <Text style={styles.title}>semplicità</Text>
      <Text style={styles.body}>{bodyCopy}</Text>
    </View>
  );
}

function SlideThree() {
  const bodyCopy =
    "Una volta aver effettuato l'acquisto,\nriceverai il tuo ordine entro\n60 minuti e avrai acquistato\ncomodamente da casa o ufficio!";
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>Non è mai stato</Text>
      <Text style={styles.title}>così veloce</Text>
      <Text style={styles.body}>{bodyCopy}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: colorPurple,
  },
  container: {
    height: "100%",
    ...stylesBase.flexColumnCenter,
  },
  scrollView: {
    height: 325,
  },
  slideWidth: {
    width: windowWidth,
  },
  slide: {
    ...stylesBase.flexColumnStartLeft,
    height: 300,
    paddingHorizontal: 30,
  },
  dots: {
    ...stylesBase.flexRowCenter,
    height: 10,
    gap: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: colorOrange,
  },
  dotInactive: {
    backgroundColor: colorWhite,
  },
  title: {
    ...stylesBase.fontBogartBold,
    color: colorOrange,
    fontSize: 38,
    lineHeight: 50,
  },
  body: {
    ...stylesBase.fontBogartMedium,
    color: colorWhite,
    fontSize: 20,
    lineHeight: 30,
    marginTop: 20,
  },
  actionContainer: {
    ...stylesBase.flexRowCenter,
    height: 30,
    marginTop: 50,
  },
  action: {
    ...stylesBase.fontBogartMedium,
    color: secondaryTextLight,
    fontSize: 16,
    lineHeight: 24,
  },
});
