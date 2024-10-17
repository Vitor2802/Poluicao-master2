import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [simulationResult, setSimulationResult] = useState([]);
  const [yearOption, setYearOption] = useState(null);

  const regions = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

  const pollutionData = {
    Norte: [
      'Desmatamento em larga escala.',
      'Queimadas ilegais.',
      'Extração de recursos minerais sem controle.',
      'Contaminação dos rios por agrotóxicos.',
      'Extinção de espécies locais.'
    ],
    Nordeste: [
      'Desertificação por práticas agrícolas inadequadas.',
      'Salinização dos solos por irrigação mal planejada.',
      'Poluição marinha por resíduos.',
      'Erosão do solo devido ao desmatamento.',
      'Aumento da temperatura das águas.'
    ],
    'Centro-Oeste': [
      'Desmatamento para expansão agrícola.',
      'Uso excessivo de agrotóxicos.',
      'Contaminação de rios.',
      'Perda de fauna local.',
      'Queimadas descontroladas.'
    ],
    Sudeste: [
      'Poluição industrial.',
      'Emissão de gases por veículos.',
      'Contaminação de rios.',
      'Descarte inadequado de resíduos sólidos.',
      'Aumento das ilhas de calor nas cidades.'
    ],
    Sul: [
      'Poluição de rios por resíduos industriais.',
      'Queimadas sazonais.',
      'Poluição atmosférica por emissões.',
      'Desmatamento para pastagem.',
      'Impacto na biodiversidade local.'
    ],
  };

  const futureConsequences = {
    Norte: {
      5: [
        'Perda de 25% da floresta.',
        'Mudança climática.',
        'Aumento de desastres naturais.',
        'Redução da qualidade do ar.',
        'Diminuição da capacidade hídrica da região.'
      ],
      10: [
        'Perda de biodiversidade.',
        'Agravamento climático.',
        'Deslocamento forçado de populações.',
        'Aumento da migração rural-urbana.',
        'Colapso de ecossistemas locais.'
      ],
    },
    Nordeste: {
      5: [
        'Aumento da aridez.',
        'Dificuldade na agricultura.',
        'Escassez de água potável.',
        'Degradação da vegetação nativa.',
        'Maior vulnerabilidade a secas.'
      ],
      10: [
        'Áreas improdutivas.',
        'Migração em massa.',
        'Redução da segurança alimentar.',
        'Aumento da pobreza rural.',
        'Desertificação irreversível.'
      ],
    },
    'Centro-Oeste': {
      5: [
        'Contaminação dos rios.',
        'Expansão agrícola descontrolada.',
        'Redução da qualidade do solo.',
        'Erosão do solo.',
        'Aumento de incêndios florestais.'
      ],
      10: [
        'Perda de fauna.',
        'Deterioração das terras.',
        'Crescimento de áreas degradadas.',
        'Colapso da agricultura sustentável.',
        'Escassez de recursos naturais.'
      ],
    },
    Sudeste: {
      5: [
        'Doenças respiratórias.',
        'Crescimento da poluição atmosférica.',
        'Aumento de alergias e problemas de saúde.',
        'Impacto econômico nas cidades.',
        'Redução da qualidade de vida.'
      ],
      10: [
        'Doenças graves.',
        'Crise de abastecimento de água.',
        'Aumento da desigualdade social.',
        'Exposição a produtos químicos tóxicos.',
        'Maior pressão sobre serviços de saúde.'
      ],
    },
    Sul: {
      5: [
        'Contaminação das fontes de água.',
        'Aumento das queimadas.',
        'Destruição de habitats.',
        'Diminuição da pesca sustentável.',
        'Aumento de pragas agrícolas.'
      ],
      10: [
        'Escassez de água potável.',
        'Eventos climáticos extremos.',
        'Colapso de ecossistemas aquáticos.',
        'Diminuição da produção agrícola.',
        'Aumento de conflitos por recursos.'
      ],
    },
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSimulationResult([]);
    setYearOption(null);
  };

  const handleSimulate = () => {
    if (selectedRegion && yearOption) {
      setSimulationResult(futureConsequences[selectedRegion][yearOption]);
    }
  };

  const handleBack = () => {
    setSelectedRegion(null);
    setSimulationResult([]);
    setYearOption(null);
  };

  return (
    <View style={styles.container}>
      {selectedRegion ? (
        <View style={styles.pollutionContainer}>
          {simulationResult.length > 0 ? (
          
            <>
              <Text style={styles.title}>Consequências em {yearOption} anos</Text>
              {simulationResult.map((consequence, index) => (
                <Text key={index} style={styles.simulationText}>- {consequence}</Text>
              ))}
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Voltar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Tipos de Poluição na Região {selectedRegion}</Text>
              {pollutionData[selectedRegion].map((pollutionType, index) => (
                <Text key={index} style={styles.pollutionText}>- {pollutionType}</Text>
              ))}
              <View style={styles.simulateOptions}>
                <TouchableOpacity
                  style={[styles.yearButton, yearOption === 5 && styles.selectedButton]}
                  onPress={() => setYearOption(5)}
                >
                  <Text style={styles.yearButtonText}>5 Anos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.yearButton, yearOption === 10 && styles.selectedButton]}
                  onPress={() => setYearOption(10)}
                >
                  <Text style={styles.yearButtonText}>10 Anos</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.simulationExplanation}>
                Ao clicar em 'Simular', você verá as consequências que a região pode enfrentar caso a poluição continue por {yearOption ? yearOption : '0'} anos.
              </Text>
              <TouchableOpacity
                style={styles.simulateButton}
                onPress={handleSimulate}
                disabled={!yearOption}
              >
                <Text style={styles.simulateText}>Simular</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        <View>
          <Text style={styles.appTitle}>Simulador Ambiental</Text>
          <Text style={styles.brazilText}>Selecione uma Região do Brasil</Text>
          <ScrollView>
            {regions.map((region, index) => (
              <TouchableOpacity key={index} style={styles.regionButton} onPress={() => handleRegionSelect(region)}>
                <Text style={styles.regionText}>{region}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7e6',
    padding: 20,
    justifyContent: 'center',
  },
  pollutionContainer: {
   backgroundColor: '#d3d3d3',
   padding: 20,
   borderRadius: 10,
   width: '90%',
  },
  appTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2b7a0b',
  },
  brazilText: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    color: '#004d1a',
  },
  regionButton: {
    padding: 15,
    backgroundColor: '#66cc66',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  regionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  pollutionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pollutionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  simulationText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#e60000',
    marginTop: 20,
  },
  simulateOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    width: '100%',
  },
  yearButton: {
    backgroundColor: '#66cc66', 
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  selectedButton: {
    backgroundColor: '#004d1a',
  },
  yearButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  simulateButton: {
    backgroundColor: '#66cc66',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  simulateText: {
    color: 'white',
    fontSize: 18,
  },
  simulationExplanation: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff6666',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#ff6666',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
