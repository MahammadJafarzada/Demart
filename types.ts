import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    OnBoardingScreen: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    ProductDetails:undefined;
    Basket: undefined;
    Wishlist: undefined;
}
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type BasketScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Basket'>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;