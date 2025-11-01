import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

const NoTransactionFound = () => {
  const router = useRouter();
  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="receipt-outline"
        size={22}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>No transactions</Text>
      <Text style={styles.emptyStateText}>
        Start tracking you financies by adding your first transactions
      </Text>
      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => router.push("/create")}
      >
        <Ionicons name="add-circle" size={22} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NoTransactionFound;
