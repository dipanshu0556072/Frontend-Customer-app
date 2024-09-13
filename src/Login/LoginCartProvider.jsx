import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext,useState } from 'react'
const LoginContext=createContext();
export function useLoginContext(){
    return useContext(LoginContext);
}

const LoginCartProvider = ({children}) => {

  //for navigation between screen
  const [stack, setStack] = useState([]);
  const [currentPage, setCurrentPage] = useState(['mainHome']);
  const [currentPageIndex,setCurrentPageIndex]=useState(1);
  const [currentPageIndexCategory,setCurrentPageIndexCategory]=useState("");
  const [currentPageIndexCategory1,setCurrentPageIndexCategory1]=useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);
  const [changeOrderStatus,setChangeOrderStatus]=useState("CONFIRMED"); 
  const [OrderDate,setOrderDate]=useState("");  
  const [profileData,setProfileData]=useState([]);
  const[otp,setOtp]=useState('');

// Determines whether to navigate to the main home page or the forgot password page
const [navigationDestination, setNavigationDestination] = useState(0);

  //get all user list 
  const [userList,setUserList]=useState([]);
  const [ip,setIp]=useState("192.168.0.112");
  const [userName,setUserName]=useState("");
  const [mobileNumber, setMobileNumber] = useState('');  
  const [checkMobile,setCheckMobile]=useState('');
  const [mobileverify,setMobileVerify]=useState(false);
  const [isFocused, setIsFocused]=useState(false);
  const [emailId, setEmailId] = useState('');  
  const [checkEmail,setCheckEmail]=useState('');
  const [emailverify,setEmailVerify]=useState(false);
  const [userLogin,setUserLogin]=useState(false);
  const [token,setToken]=useState("");
  const [womenFormalData,setWomenFormalData]=useState([]);

  //current Login userId in dataBase
  const [loginUserId,setLoginUserId]=useState([]);

  const [homeIcon, setHomeIcon] = useState(true);
  const [categoryIcon, setCategoryIcon] = useState(false);
  const [bellIcon, setBellIcon] = useState(false);
  const [userIcon, setUserIcon] = useState(false);

  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState(""); 

  const [targetParentCategory,setTargetParentCategory]=useState("");

  //isMobileVerified
    


  const [gender,setGender]=useState("");
    //update userName
    const [updateUserName, setUpdateUserName] = useState(userName === null ? '' : userName);

    //update mobileNumber
    const [updateMobileName,setUpdateMobileName]=useState(mobileNumber);
    const [AlternativeMobileNumber,setAlternativeMobileNumber]=useState("");
    //update emailId 
    const [updateEmail,setUpdateEmail]=useState(emailId);
    //update gender
    const [updateGender,setUpdateGender]=useState(gender);
    const [updatePassword,setUpdatePassword]=useState("");
    const [DOB,setDOB]=useState("");
    const [DateOfAnniversary,setDateOfAnniversary]=useState("");
    




  const contextValue={
      //for storing UserName
      userName,setUserName,
      
      //for storing mobile number
      mobileNumber,
      setMobileNumber,

      //for storing email id
      emailId,
      setEmailId,checkEmail,setCheckEmail, 
      
      //check for mobile verify
      mobileverify,
      setMobileVerify,

      //check for mobile verify
      emailverify,
      setEmailVerify,

      checkMobile,
      setCheckMobile,

      //storing gender
      gender,setGender,

      //
      isFocused, setIsFocused,

      //
      homeIcon, setHomeIcon,
      categoryIcon, setCategoryIcon,
      bellIcon, setBellIcon,
      userIcon, setUserIcon,

      //
      password,setPassword,
      confirmPassword,setConfirmPassword,

      //
      userLogin,setUserLogin,
      //
      token,setToken,
      //
      ip,setIp,
      
      //for getting the user Id who login
      loginUserId,setLoginUserId,
      currentPage, setCurrentPage,
      currentPageIndex,setCurrentPageIndex,
      currentPageIndexCategory,setCurrentPageIndexCategory,

      pushToStack: (page) => {
        if(stack.includes(page)){
           setStack(stack.filter((item)=>item!==page));
        }else{
          setStack([...stack, page]);
          setCurrentPage([...currentPage, page]);  
        }
      },
    
      popFromStack: (navigation) => {
        if(currentPage && currentPage.length==1 && currentPage[0]==='mainHome'){
         navigation.navigate('mainHome');
        }else{
          if (stack.length > 0 && currentPage.length > 1) {
            const newStack = [...stack];
            const previousPage = newStack.pop();
            setStack(newStack);
        
            const newCurrentPage = [...currentPage];
            newCurrentPage.pop();
            setCurrentPage(newCurrentPage);
        
            // Navigate to the updated currentPage
            if (newCurrentPage.length > 0) {
              navigation.navigate(newCurrentPage[newCurrentPage.length - 1]);
            }
          }  
        }
      },
    
      updateUserName,setUpdateUserName,
      updateMobileName,setUpdateMobileName,
      AlternativeMobileNumber,setAlternativeMobileNumber,
      updateEmail,setUpdateEmail,updateGender,setUpdateGender,
      updatePassword,setUpdatePassword,
      DOB,setDOB,
      selectedItemIndex, setSelectedItemIndex,
      changeOrderStatus,setChangeOrderStatus,
      OrderDate,setOrderDate,
      targetParentCategory,setTargetParentCategory,
      currentPageIndexCategory1,setCurrentPageIndexCategory1,
      profileData,setProfileData,
      otp,setOtp,
      userList,setUserList,
      DateOfAnniversary,setDateOfAnniversary,

      navigationDestination, setNavigationDestination
      
  }  
  return (
      <LoginContext.Provider value={contextValue}>
        {children}  
      </LoginContext.Provider>
)
}

export default LoginCartProvider

const styles = StyleSheet.create({})