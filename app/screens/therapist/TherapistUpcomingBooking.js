import React, { useContext, useEffect, useState } from 'react';
import { FlatList,View,SectionList } from 'react-native';

import TherapistUpcomingCard from '../../components/therapist/TherapistUpcomingCard';
import TherapistUpcomingPendingCard from '../../components/therapist/TherapistUpcomingPendingCard';
import bookingsApi from '../../api/bookings';
import AuthContext from '../../auth/context';
// import { installReactHook } from 'react-native/Libraries/Performance/Systrace';

function TherapistUpcomingBooking(props) {
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [upcomingBookingPending, setUpcomingBookingPending] = useState([]);
    const [upcomingBookingsApprove, setUpcomingBookingsApprove] = useState([]);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        loadUpcomingBookings();
    },[upcomingBookings]);

    const loadUpcomingBookings = async () => {
        const response = await bookingsApi.getTherapistUpcomingBookings(user.userObj.therapist_id);
        let upcomingBookings = response.data;
        if (!upcomingBookings) return ;
        let formattedBookings = upcomingBookings.map(booking => {
            let date = new Date(booking.booking_time);
            return { ...booking, 
                booking_month: date.toLocaleString('default', { month: 'short' }), 
                booking_day: date.getDate(),
                booking_time: date.toLocaleString('default', { hour: 'numeric',minute: 'numeric', hour12: true })
            }
            });
        setUpcomingBookings(formattedBookings);
        // console.log(formattedBookings)
        // #logic to separate the list and set it in the useState Hook
//         data = data.filter((item) => item.state == 'New York').map(({id, name, city}) => ({id, name, city}));
// console.log(data);
        let upcomingBooking_Pending = formattedBookings.filter((item) => item.confirmation_status == -1).map((item) => (item));
        let upcomingBookings_Approve = formattedBookings.filter((item) => item.confirmation_status != -1).map((item) => (item));

        setUpcomingBookingPending(upcomingBooking_Pending);
        setUpcomingBookingsApprove(upcomingBookings_Approve);
        // console.log(upcomingBookingPending);
        // console.log(upcomingBookingsApprove);
    }


    
    
    return (
        
        <View>
            <SectionList 
            // renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 'bold' }}>{title}</Text>} 
            sections={[ 
                { data: upcomingBookingPending.sort((a, b) => a.bookings_id < b.bookings_id),
                    renderItem: ({ item }) => <TherapistUpcomingPendingCard
                    therapistData = {item}
                    // bookingDate= {item.bookingDate}
                    // atheleteName= {item.atheleteName}
                    // bookingId= {item.bookingId}
                    // location= {item.location}
                />}, 
                { data: upcomingBookingsApprove.sort((a, b) => a.bookings_id < b.bookings_id),
                    renderItem: ({ item }) => <TherapistUpcomingCard
                        therapistData = {item}
                    // bookingDate= {item.bookingDate}
                    // atheleteName= {item.atheleteName}
                    // bookingId= {item.bookingId}
                    // location= {item.location}
                    // status=  {item.status === 1 ? 'Approved': 'Declined'}
                    />}, 
            ]} 
            keyExtractor={(item) => item.bookings_id.toString()} 
        />
        </View>
    );
}

export default TherapistUpcomingBooking;