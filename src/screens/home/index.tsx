import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { styles } from "./styles";

import { Participant } from "../../components/Participant";
import { useState } from "react";

interface ParticipantsProps {
  name: string;
}

export default function Home() {
  const [participants, setParticipants] = useState<ParticipantsProps[]>([]);
  const [participantNameInput, setParticipantNameInput] = useState("");

  function handleParticipantAdd() {
    const existSameName = participants.some(
      (participant) => participant.name === participantNameInput
    );

    if (existSameName) {
      Alert.alert(
        "Participante Existe",
        "Já existe um participante na lista com esse nome."
      );
      return;
    }

    setParticipants((oldParticipants) => [
      ...oldParticipants,
      { name: participantNameInput },
    ]);
    setParticipantNameInput("");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          setParticipants((oldParticipants) =>
            oldParticipants.filter((participant) => participant.name !== name)
          );
          Alert.alert("Participante deletado com sucesso!");
        },
      },
      { text: "Não", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantNameInput}
          value={participantNameInput}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Listas Grandes */}
      <FlatList
        data={participants}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Participant
            key={item.name}
            name={item.name}
            onRemove={handleParticipantRemove}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Listas pequenas  */}
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {participants.map((participant) => (
          <Participant
            key={participant.name}
            name={participant.name}
            onRemove={handleParticipantRemove}
          />
        ))}
      </ScrollView> */}
    </View>
  );
}
