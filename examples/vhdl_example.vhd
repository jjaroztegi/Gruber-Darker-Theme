library ieee;
use ieee.std_logic_1164.all;

--------------------------------------------------------------------------------
-- Entity Declaration: Defines the interface of the parity detector
--------------------------------------------------------------------------------
entity detector_paridad is
    port (
        clk     : in  std_logic;          -- Clock input
        reset_n : in  std_logic;          -- Asynchronous reset input (active low)
        en      : in  std_logic;          -- Enable input for data processing
        din     : in  std_logic;          -- Data input bit
        paridad : out std_logic;          -- Parity output bit
        eno     : out std_logic           -- Enable output bit, indicates parity is valid
    );
end detector_paridad;

--------------------------------------------------------------------------------
-- Architecture Declaration: RTL implementation of the parity detector
--------------------------------------------------------------------------------
architecture rtl of detector_paridad is
    -- Define the state type for the Finite State Machine (FSM)
    type t_state is (idle, odd, even, calc);
    signal state_d, state_q : t_state; -- FSM state signals: next state (d), current state (q)

    -- Output register signals
    signal parity_d, parity_q, eno_d, eno_q : std_logic;
begin -- architecture rtl

    ----------------------------------------------------------------------------
    -- FSM - Next State Logic (Combinational Process)
    ----------------------------------------------------------------------------
    p_fsm_d: process(en, din, state_q)
    begin -- process p_fsm_d
        case state_q is
            when idle =>
                if (en = '1' and din = '1') then
                    state_d <= odd;
                elsif (en = '1' and din = '0') then
                    state_d <= even;
                else
                    state_d <= idle;
                end if;
            when odd =>
                if (en = '1' and din = '1') then
                    state_d <= even;
                elsif (en = '1' and din = '0') then
                    state_d <= odd;
                else
                    state_d <= calc;
                end if;
            when even =>
                if (en = '1' and din = '1') then
                    state_d <= odd;
                elsif (en = '1' and din = '0') then
                    state_d <= even;
                else
                    state_d <= calc;
                end if;
            when calc =>
                state_d <= idle;
            when others =>
                state_d <= idle;
        end case;
    end process p_fsm_d;

    ----------------------------------------------------------------------------
    -- FSM - State Register (Sequential Process)
    ----------------------------------------------------------------------------
    p_fsm_q : process (clk, reset_n)
    begin -- process p_fsm_q
        if reset_n = '0' then                  -- Asynchronous reset (active low)
            state_q <= idle;
        elsif clk'event and clk = '1' then      -- Rising clock edge
            state_q <= state_d;                 -- Update current state with next state
        end if;
    end process p_fsm_q;

    ----------------------------------------------------------------------------
    -- Output Logic - Generate inputs for output registers (Combinational Process)
    ----------------------------------------------------------------------------
    p_outs_d: process (state_d, parity_q)
    begin -- process p_outs_d
        case state_d is
            when idle =>
                parity_d <= parity_q;        -- Maintain previous parity value
                eno_d <= '0';               -- Output enable is low in idle
            when odd =>
                parity_d <= '0';               -- Odd state implies odd parity so far
                eno_d <= '0';               -- Output not yet valid
            when even =>
                parity_d <= '1';              -- Even state implies even parity so far
                eno_d <= '0';               -- Output not yet valid
            when calc =>
                parity_d <= parity_q;        -- Pass through registered parity
                eno_d <= '1';               -- Output enable is high when calculation is done
            when others =>
                parity_d <= '0';
                eno_d <= '0';
        end case;
    end process p_outs_d;

    ----------------------------------------------------------------------------
    -- Output Registers (Sequential Process)
    ----------------------------------------------------------------------------
    p_outs_q : process (clk, reset_n)
    begin -- process p_outs_q
        if reset_n = '0' then                  -- Asynchronous reset (active low)
            parity_q <= '0';
            eno_q <= '0';
        elsif clk'event and clk = '1' then      -- Rising clock edge
            parity_q <= parity_d;              -- Register parity output
            eno_q <= eno_d;                 -- Register output enable output
        end if;
    end process p_outs_q;

    ----------------------------------------------------------------------------
    -- Output Port Assignments - Connect internal signals to entity output ports
    ----------------------------------------------------------------------------
    paridad <= parity_q;
    eno <= eno_q;

end rtl;