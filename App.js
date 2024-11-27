import { StatusBar } from 'expo-status-bar';
import React ,{ useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Modal,Alert} from 'react-native';
import api from './src/Services/API'

export default function App() {

  const [CEP, setCEP] = useState("")
  const [CEPe, setCEPe] = useState("")
  const [Estado, setEstado] = useState("")
  const [Cidade, setCidade] = useState("")
  const [Bairro, setBairro] = useState("")
  const [Rua, setRua] = useState("")

  const [verModal, setVerModal] = useState(false);
  const [Infos, setInfos] = useState("")

  async function BuscarCEP (){

  
         try{
          const resposta = await api.get(`https://viacep.com.br/ws/${CEP}/json/`)
          setCEPe(resposta.data.cep)
          setEstado(resposta.data.uf)
          setCidade(resposta.data.localidade)
          setBairro(resposta.data.bairro)
          setRua(resposta.data.logradouro)



          if(CEP == ""){
            Alert.alert("Irmão faça me um favor e coloque um CEP PorFavor")
            setCEP("")
         }
         else{
          setVerModal(true)
         }
         } catch(error){
          console.log("erro" + error)
         }
         
        
      }






  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Olá
      </Text>
      <Text style={styles.subtitle}>
        Por Favor Digite seu CEP abaixo
      </Text>
      <TextInput style={styles.input}
      value={CEP}
      onChangeText={(texto) => setCEP(texto)}
       placeholder='Exemplo: 010100'>
      </TextInput>

      <TouchableOpacity style={styles.botao}  onPress={(BuscarCEP)}>
        <Text style={styles.textobotao}>BUSCAR</Text>
      </TouchableOpacity>










      <Modal animationType='slide' visible={verModal} >
      <View style={styles.container}>
      <Text style={styles.title}>
        Olá
      </Text>
      <Text style={styles.subtitle}>
        Por Favor Digite seu CEP abaixo
      </Text>
      <TextInput style={styles.input}
      value={CEP}
      onChangeText={(texto) => setCEP(texto)}
      keyboardType="numeric"
       placeholder='Exemplo: 010100'>
      </TextInput>
                 <TouchableOpacity style={styles.botao} onPress={() => setVerModal(false)}>
                    <Text style={styles.textobotao} >VOLTAR</Text>
                  </TouchableOpacity> 
                  <StatusBar style="auto" />


                  <Image style={styles.imagem1} source={require('./img/house.png')} />
                  <Text style={styles.CEP}> CEP : {CEPe}</Text>

                  <Image style={styles.imagem1} source={require('./img/district.png')} />
                  <Text style={styles.CEP1}> Estado :  {Estado}</Text>

                  <Image style={styles.imagem1} source={require('./img/cityscape.png')} />
                  <Text style={styles.CEP2}> Cidade :  {Cidade}</Text>

                  <Image style={styles.imagem1} source={require('./img/neighborhood.png')} />
                  <Text style={styles.CEP3}> Bairro :  {Bairro}</Text>

                  <Image style={styles.imagem1} source={require('./img/map.png')} />
                  <Text style={styles.CEP4}>          Logradouro : {Rua} </Text>

            </View>
            </Modal>
      





      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 90,
    marginTop: -10,
    paddingBottom: 20
  },
  subtitle:{
    fontSize: 26,
  },
  input:{
    width:280,
    height:50,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginTop: 20,
    color: '#757575',
    padding: 15
  },
  botao:{
    width:200,
    height:50,
    backgroundColor: 'black',
    borderRadius:19,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textobotao:{
    color:'white',
    fontSize: 25,
    fontWeight: '500'
  },
  imagem1:{
    width:40,
    height:44,
    marginTop: 35,
    marginLeft: -250
  },
  CEP:{
    marginTop: -28,
    marginLeft: -90,
  },
  text:{
    color: '#fff',
    marginTop:50
  },
  CEP1:{
    marginTop: -28,
    marginLeft: -120,
  },
  CEP2:{
    marginTop: -28,
    marginLeft: -75,
  },
  CEP3:{
    marginTop: -28,
    marginLeft: -70,
  },
  CEP4:{
    marginTop: -28,
    marginLeft: -30,
  },
  botfinal:{
    width:280,
    height:50,
    backgroundColor: '#000',
    marginTop: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textfinal:{
    color: 'white',
    fontWeight: '500'
  }

});
